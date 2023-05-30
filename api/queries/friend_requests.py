from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class FriendRequestOut(BaseModel):
    request_id: int
    sender_id: int
    username: str
    first_name: str
    last_name: str

class MakeFriendRequestIn(BaseModel):
    receiver_username: str

class MakeFriendRequestOut(BaseModel):
    request_id: int
    sender_id: int
    receiver_id: int

class UpdateFriendRequest(BaseModel):
    status: str

class FriendRequestsRepo(BaseModel):
    def get_friend_requests(self, user_id: int) -> Union[List[FriendRequestOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT fr.request_id, u.user_id, u.username, u.first_name, u.last_name
                        FROM user_table u
                        JOIN friend_request fr ON
                        (u.user_id = fr.sender_id AND fr.receiver_id = %(user_id)s)
                        WHERE status = 'pending';
                        """,
                        {
                            "user_id": user_id
                        }
                    )
                    result = []
                    for record in db:
                        friend_request = FriendRequestOut(
                            request_id=record[0],
                            sender_id=record[1],
                            username=record[2],
                            first_name=record[3],
                            last_name=record[4],
                        )
                        result.append(friend_request)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get list of friend requests"}

    def create_friend_request(self, user_id: int, friend_request: MakeFriendRequestIn) -> Union[MakeFriendRequestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    receiver_id_query = db.execute(
                        """
                        SELECT user_id
                        FROM user_table
                        WHERE username = %(username)s;
                        """,
                        {
                            "username": friend_request.receiver_username
                        }
                    )

                    receiver_id_query_result = receiver_id_query.fetchone()
                    if receiver_id_query_result:
                        receiver_id = receiver_id_query_result[0]
                    else:
                        receiver_id = None

                    exists = db.execute(
                        """
                        SELECT COUNT(*)
                        FROM friend_request
                        WHERE sender_id = %(user_id)s AND receiver_id = %(receiver_id)s
                        OR sender_id = %(receiver_id)s AND receiver_id = %(user_id)s;
                        """,
                        {
                            "user_id": user_id,
                            "receiver_id": receiver_id
                        }
                    )

                    if exists.fetchone()[0] > 0:
                        return {"message": "Friend request has already been made to this user"}
                    else:
                        result = db.execute(
                            """
                            INSERT INTO friend_request
                                (sender_id, receiver_id)
                            VALUES
                                (%(sender_id)s, %(receiver_id)s)
                            RETURNING request_id;
                            """,
                            {
                                "sender_id": user_id,
                                "receiver_id": receiver_id
                            }
                        )
                        request_id = result.fetchone()[0]
                        return MakeFriendRequestOut(
                            request_id=request_id,
                            sender_id=user_id,
                            receiver_id=receiver_id
                        )
        except Exception as e:
            print(e)
            return {"message": "Could not create friend request: User does not exist"}

    def update_friend_request(self, receiver_id: int, request_id: int, friend_request: UpdateFriendRequest) -> Union[UpdateFriendRequest, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    checking_request = db.execute(
                        """
                        SELECT *
                        FROM friend_request
                        WHERE request_id = %(request_id)s;
                        """,
                        {
                            "request_id": request_id
                        }
                    )

                    exists = checking_request.fetchone()
                    if exists and (request_id == exists[0] and receiver_id == exists[3]):
                        if exists[1] == "pending" and friend_request.status == "accepted":
                            db.execute(
                                """
                                UPDATE friend_request
                                SET status = %(status)s
                                WHERE request_id = %(request_id)s;
                                """,
                                {
                                    "status": friend_request.status,
                                    "request_id": request_id
                                }
                            )

                            db.execute(
                                """
                                INSERT INTO friendships
                                    (user1_id, user2_id)
                                VALUES
                                    (%(user1_id)s, %(user2_id)s)
                                """,
                                {
                                    "user1_id": exists[2],
                                    "user2_id": receiver_id
                                }
                            )

                            return UpdateFriendRequest(
                                status="accepted"
                            )
                        elif exists[1] == "pending" and friend_request.status == "rejected":
                            db.execute(
                                """
                                DELETE FROM friend_request
                                WHERE request_id = %(request_id)s;
                                """,
                                {
                                    "request_id": request_id
                                }
                            )
                            return UpdateFriendRequest(
                                status="rejected"
                            )
                        else:
                            return {"message": "Friend request no longer exists"}
                    else:
                        return {"message": "Could not find indicated friend request"}
        except Exception as e:
            print(e)
            return {"message": "Could not update friend request status"}
