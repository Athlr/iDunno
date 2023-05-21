from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class FriendRequestIn(BaseModel):
    pass

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
                        (u.user_id = fr.sender_id AND fr.receiver_id = %(user_id)s)
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
