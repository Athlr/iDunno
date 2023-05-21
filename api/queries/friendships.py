from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class FriendshipIn(BaseModel):
    pass

class FriendshipOut(BaseModel):
    friendship_id: int
    username: str
    email: str
    first_name: str
    last_name: str

class FriendshipsRepo:
    def get_friends(self, user_id: int) -> Union[List[FriendshipOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT f.friendship_id, u.username, u.email, u.first_name, u.last_name
                        FROM user_table u
                        JOIN friendships f ON
                        (u.user_id = f.user1_id AND f.user2_id = %s)
                        OR (u.user_id = f.user2_id AND f.user1_id = %s)
                        """,
                        [
                            user_id,
                            user_id
                        ]
                    )
                    result = []
                    for record in db:
                        friendship = FriendshipOut(
                            friendship_id=record[0],
                            username=record[1],
                            email=record[2],
                            first_name=record[3],
                            last_name=record[4],
                        )
                        result.append(friendship)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get list of friends"}
