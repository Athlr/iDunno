from pydantic import BaseModel
from queries.pool import pool

class DuplicateAccountError(ValueError):
    pass

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

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountRepo:
    def get(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT user_id, username, password, first_name, last_name, email
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
                        RETURNING user_id
                        """,
                        [
                            info.username,
                            hashed_password,
                            info.first_name,
                            info.last_name,
                            info.email
                        ],
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(
                        id=id,
                        email=info.email,
                        username=info.username,
                        first_name=info.first_name,
                        last_name=info.last_name,
                        hashed_password=hashed_password,
                    )
        except Exception:
            return {"message": "Could not create account"}
