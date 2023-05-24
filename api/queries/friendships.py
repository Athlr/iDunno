from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class FriendshipIn(BaseModel):
    pass

class FriendshipOut(BaseModel):
    friendship_id: int
    friend_id: int
    username: str
    email: str
    first_name: str
    last_name: str
    profile_pic: str

class FriendshipsRepo:
    def get_friends(self, user_id: int) -> Union[List[FriendshipOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT f.friendship_id, u.user_id, u.username, u.email, u.first_name, u.last_name, u.profile_picture_url
                        FROM user_table u
                        JOIN friendships f ON
                        (u.user_id = f.user1_id AND f.user2_id = %s)
                        OR (u.user_id = f.user2_id AND f.user1_id = %s);
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
                            friend_id=record[1],
                            username=record[2],
                            email=record[3],
                            first_name=record[4],
                            last_name=record[5],
                            profile_pic=record[6]
                        )
                        result.append(friendship)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get list of friends"}

    def delete_friendship(self, user_id: int, friend_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM friendships
                        WHERE (user1_id = %(user_id)s AND user2_id = %(friend_id)s)
                        OR (user1_id = %(friend_id)s AND user2_id = %(user_id)s);
                        """,
                        {
                            'user_id': user_id,
                            'friend_id': friend_id
                        }
                    )
                    return True
        except Exception as e:
            print(e)
            return False
