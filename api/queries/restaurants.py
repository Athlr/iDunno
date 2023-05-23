from pydantic import BaseModel
from queries.pool import pool
from typing import Union


class Error(BaseModel):
    message: str


class RestaurantIn(BaseModel):
    name: str
    price: str
    cuisine_id: int


class RestaurantOut(BaseModel):
    restaurant_id: int
    name: str
    price: str
    cuisine_id: int


class RestaurantRepository:
    def post(self, user_id: int, restaurant: RestaurantIn) -> Union[RestaurantOut, Error]:
        try:
            with pool.connection() as conn: 
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO restaurant 
                            (name, price, cuisine_id, user_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING restaurant_id;
                        """,
                        [
                            restaurant.name,
                            restaurant.price,
                            restaurant.cuisine_id,
                            user_id,
                        ]
                    )
                    restaurant_id = result.fetchone()[0]
                    old_data = restaurant.dict()
                    return RestaurantOut(restaurant_id=restaurant_id, **old_data)
        except Exception:
            return {"message": "Create did not work"}
