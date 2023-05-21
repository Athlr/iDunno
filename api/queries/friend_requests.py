from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class FriendRequestIn(BaseModel):
    receiver_username: str

class FriendRequestPOST(BaseModel):
    request_id: int
    sender_id: int
    receiver_id: int

class FriendRequestOut(BaseModel):
    request_id: int
    sender_id: int
    username: str
    first_name: str
    last_name: str

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
                        (u.user_id = fr.sender_id AND fr.receiver_id = %(user_id)s);
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

    def create_friend_request(self, user_id: int, friend_request: FriendRequestIn) -> Union[FriendRequestPOST, Error]:
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
                        WHERE sender_id = %(user_id)s AND receiver_id = %(receiver_id)s;
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
                        return FriendRequestPOST(
                            request_id=request_id,
                            sender_id=user_id,
                            receiver_id=receiver_id
                        )
        except Exception:
            return {"message": "Could not create friend request"}
