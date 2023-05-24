from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class ListConnectionIn(BaseModel):
    list_id: int
    restaurant_id: int


class ListConnectionOut(BaseModel):
    connection_id: int
    list_id: int
    restaurant_id: int


class ListConnectionRepository:
    def create(self, user_id: int, list_connection: ListConnectionIn) -> ListConnectionOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO list_connection
                            (list_id, restaurant_id)
                        VALUES
                            (%s, %s)
                        RETURNING connection_id;
                        """,
                        [
                            list_connection.list_id,
                            list_connection.restaurant_id
                        ]
                    )
                    connection_id = result.fetchone()[0]
                    return self.list_connection_in_to_out(connection_id, list_connection)
        except Exception as e:
            print(e)
            return {"message": "Could not create the list connection"}

    def delete(self, user_id: int, connection_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM list_connection
                        WHERE connection_id = %s
                        """,
                        [connection_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_all(self) -> Union[Error, List[ListConnectionOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT connection_id, list_id, restaurant_id
                        FROM list_connection
                        """
                    )
                    return [
                        self.record_to_list_connection_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all list connections"}

    def get_one(self, connection_id: int) -> Optional[ListConnectionOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT connection_id, list_id, restaurant_id
                        FROM list_connection
                        WHERE connection_id = %s
                        """,
                        [connection_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_list_connection_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that list connection"}

    def list_connection_in_to_out(self, connection_id: int, list_connection: ListConnectionIn):
        old_data = list_connection.dict()
        return ListConnectionOut(connection_id=connection_id, **old_data)

    def record_to_list_connection_out(self, record):
        return ListConnectionOut(
            connection_id=record[0],
            list_id=record[1],
            restaurant_id=record[2]
        )
