from pydantic import BaseModel
from typing import Optional, Union
from queries.pool import pool

class DuplicateAccountError(ValueError):
    pass

class Error(BaseModel):
    message: str

class AccountIn(BaseModel):
    email: str
    username: str
    password: str
    first_name: str
    last_name: str

class AccountOut(BaseModel):
    id: int
    email: str
    username: str
    first_name: str
    last_name: str
    profile_picture_url: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class ProfileUpdate(BaseModel):
    first_name: str = None
    last_name: str = None
    password: str = None
    profile_picture: str = None

class AccountRepo:
    def get(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT user_id, username, password, first_name, last_name, email, profile_picture_url
                        FROM user_table
                        WHERE username = %s;
                        """,
                        [
                            username
                        ],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return AccountOutWithPassword(
                        id=record[0],
                        email=record[5],
                        username=record[1],
                        first_name=record[3],
                        last_name=record[4],
                        profile_picture_url=record[6],
                        hashed_password=record[2],
                    )
        except Exception:
            return {"message": "Could not find account"}

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO user_table (username, password, first_name, last_name, email)
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING user_id, profile_picture_url
                        """,
                        [
                            info.username,
                            hashed_password,
                            info.first_name,
                            info.last_name,
                            info.email
                        ],
                    )
                    object = result.fetchone()
                    id = object[0]
                    profile_picture_url = object[1]
                    return AccountOutWithPassword(
                        id=id,
                        email=info.email,
                        username=info.username,
                        first_name=info.first_name,
                        last_name=info.last_name,
                        profile_picture_url=profile_picture_url,
                        hashed_password=hashed_password,
                    )
        except Exception:
            return {"message": "Could not create account"}

    def getAccount(self, user_id: int) -> Union[AccountOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    user_data = db.execute(
                        """
                        SELECT user_id, email, username, first_name, last_name, profile_picture_url
                        FROM user_table
                        WHERE user_id = %(user_id)s;
                        """,
                        {
                            "user_id": user_id
                        }
                    )
                    record = user_data.fetchone()
                    if record is None:
                        return None
                    return AccountOut(
                        id=record[0],
                        email=record[1],
                        username=record[2],
                        first_name=record[3],
                        last_name=record[4],
                        profile_picture_url=record[5]
                    )
        except Exception as e:
            print(e)
            return {"message": "Could not grab account"}



    def updateAccount(self, user_id: int, profile_update: ProfileUpdate, hashed_password: str | None = None) -> Optional[Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    user_data = db.execute(
                        """
                        SELECT *
                        FROM user_table
                        WHERE user_id = %(user_id)s
                        """,
                        {
                            "user_id": user_id
                        }
                    )
                    user = user_data.fetchone()
                    if not user:
                        return {"message": "User not found"}

                    if profile_update.first_name:
                        db.execute(
                            """
                            UPDATE user_table
                            SET first_name = %(first_name)s
                            WHERE user_id = %(user_id)s
                            """,
                            {
                                "first_name": profile_update.first_name,
                                "user_id": user_id
                            }
                        )

                    if profile_update.last_name:
                        db.execute(
                            """
                            UPDATE user_table
                            SET last_name = %(last_name)s
                            WHERE user_id = %(user_id)s
                            """,
                            {
                                "last_name": profile_update.last_name,
                                "user_id": user_id
                            }
                        )

                    if profile_update.password:
                        db.execute(
                            """
                            UPDATE user_table
                            SET password = %(password)s
                            WHERE user_id = %(user_id)s
                            """,
                            {
                                "password": hashed_password,
                                "user_id": user_id
                            }
                        )

                    if profile_update.profile_picture:
                        db.execute(
                            """
                            UPDATE user_table
                            SET profile_picture_url = %(profile_picture)s
                            WHERE user_id = %(user_id)s
                            """,
                            {
                                "profile_picture": profile_update.profile_picture,
                                "user_id": user_id
                            }
                        )
        except Exception as e:
            print(e)
            return {"message": "Could not update account information"}
