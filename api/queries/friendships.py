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
    favorited_id: Optional[int] = None


class FriendOut(BaseModel):
    friend_id: int
    username: str
    email: str
    first_name: str
    last_name: str
    profile_pic: str
    favorited_id: Optional[int] = None


class FriendshipsRepo:
    def get_friends(self, user_id: int) -> Union[List[FriendshipOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT f.friendship_id, u.user_id, u.username, u.email, u.first_name, u.last_name, u.profile_picture_url, ff.friends_favorites_id
                        FROM user_table u
                        JOIN friendships f ON
                        (u.user_id = f.user1_id AND f.user2_id = %s)
                        OR (u.user_id = f.user2_id AND f.user1_id = %s)
                        LEFT JOIN friends_favorites ff ON
                        (u.user_id = ff.friend_id);
                        """,
                        [user_id, user_id],
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
                            profile_pic=record[6],
                            favorited_id=record[7],
                        )
                        result.append(friendship)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get list of friends"}

    # Will have to add logic here to find if user is friends with another user
    # before giving access to see user's information
    def get_friend(self, user_id: int, friend_id: int) -> Optional[FriendOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    check_friends = db.execute(
                        """
                        SELECT friendship_id
                        FROM friendships
                        WHERE user1_id = %(user_id)s AND user2_id = %(friend_id)s
                        OR user1_id = %(friend_id)s AND user2_id = %(user_id)s
                        """,
                        {"user_id": user_id, "friend_id": friend_id},
                    )
                    check_friends_exist = check_friends.fetchone()
                    if check_friends_exist:
                        result = db.execute(
                            """
                            SELECT u.user_id, u.username, u.email, u.first_name, u.last_name, u.profile_picture_url, ff.friends_favorites_id
                            FROM user_table u
                            LEFT JOIN friends_favorites ff ON
                            (u.user_id = ff.friend_id)
                            WHERE u.user_id = %(friend_id)s;
                            """,
                            {"friend_id": friend_id},
                        )
                        record = result.fetchone()
                        if record is None:
                            return None
                        return FriendOut(
                            friend_id=record[0],
                            username=record[1],
                            email=record[2],
                            first_name=record[3],
                            last_name=record[4],
                            profile_pic=record[5],
                            favorited_id=record[6],
                        )
        except Exception as e:
            print(e)
            return {"message": "Could not find user"}

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
                        {"user_id": user_id, "friend_id": friend_id},
                    )
                    db.execute(
                        """
                        DELETE FROM friend_request
                        WHERE (sender_id = %(user_id)s AND receiver_id = %(friend_id)s)
                        OR (sender_id = %(friend_id)s AND receiver_id = %(user_id)s);
                        """,
                        {"user_id": user_id, "friend_id": friend_id},
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def toggle_favorite(self, user_id: int, friend_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    check_favorites = db.execute(
                        """
                        SELECT FROM friends_favorites
                        WHERE user_id = %(user_id)s AND friend_id = %(friend_id)s;
                        """,
                        {"user_id": user_id, "friend_id": friend_id},
                    )
                    exists = check_favorites.fetchone()
                    if exists is None:
                        db.execute(
                            """
                            INSERT INTO friends_favorites
                                (user_id, friend_id)
                            VALUES
                                (%(user_id)s, %(friend_id)s)
                            """,
                            {"user_id": user_id, "friend_id": friend_id},
                        )
                        return True
                    else:
                        db.execute(
                            """
                            DELETE FROM friends_favorites
                            WHERE user_id = %(user_id)s AND friend_id = %(friend_id)s;
                            """,
                            {"user_id": user_id, "friend_id": friend_id},
                        )
                        return True
        except Exception as e:
            print(e)
            return False
