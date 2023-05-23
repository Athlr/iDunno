from pydantic import BaseModel
from queries.pool import pool
from typing import Union, List


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
    def get_all(self) -> Union[Error, List[RestaurantOut]]:
        try:
            # connect the db
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our SELECT statement
                    result = db.execute(
                        """
                        SELECT restaurant_id, name, price, cuisine_id
                        FROM restaurant
                        ORDER BY name;
                        """
                    )
                    result = []
                    for record in db:
                        restaurant = RestaurantOut(
                            restaurant_id=record[0],
                            name=record[1],
                            price=record[2],
                            cuisine_id=record[3],
                        )
                        result.append(restaurant)
                    return result
        except Exception as e :
            print(e)
            return {"message": "Could not get all vacations"}

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
    
