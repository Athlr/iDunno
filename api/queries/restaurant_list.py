from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class RestaurantListIn(BaseModel):
    name: str
    description: Optional[str]
    user_id: int


class RestaurantListOut(BaseModel):
    list_id: int
    name: str
    description: Optional[str]
    user_id: int


class RestaurantListRepository:
    def create(self, restaurant_list: RestaurantListIn) -> RestaurantListOut:
        # try:
        # connect the database
        with pool.connection() as conn:
            # get a cursor
            with conn.cursor() as db:
                # Run our Insert statement
                result = db.execute(
                    """
                    INSERT INTO restaurant_list
                        (name, description, user_id)
                    VALUES
                        (%s, %s, %s)
                    RETURNING list_id;

                    """,
                    [
                        restaurant_list.name,
                        restaurant_list.description,
                        restaurant_list.user_id
                    ]
                )
                list_id = result.fetchone()[0]
                # Return new data
                old_data = restaurant_list.dict()
                return RestaurantListOut(list_id=list_id, **old_data)
        # except Exception as e:
        #     print(e)
        #     return {"message": "Create did not work!"}