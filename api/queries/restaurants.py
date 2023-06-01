from pydantic import BaseModel
from queries.pool import pool
from typing import Union, List, Optional


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


class RestaurantInWithListID(BaseModel):
    name: str
    price: str
    cuisine_id: int
    list_id: int


class RestaurantRepository:
    def get_one(self, restaurant_id: int) -> Optional[RestaurantOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT restaurant_id,
                                name,
                                price,
                                cuisine_id
                        FROM restaurant
                        WHERE restaurant_id = %s
                        """,
                        [restaurant_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_restaurant_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that restaurant"}

    def delete(self, restaurant_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM restaurant
                        WHERE restaurant_id = %s
                        """,
                        [restaurant_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, restaurant_id: int, restaurant: RestaurantIn) -> Union[RestaurantOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE restaurant
                        SET name = %s,
                            price = %s,
                            cuisine_id = %s
                        WHERE restaurant_id = %s
                        """,
                        [
                            restaurant.name,
                            restaurant.price,
                            restaurant.cuisine_id,
                            restaurant_id,
                        ]
                    )
                    return RestaurantOut(restaurant_id=restaurant_id, **restaurant.dict())
        except Exception as e:
            print(e)
            return {"message": "Could not update that restaurant"}

    def get_all(self, user_id: int) -> Union[Error, List[RestaurantOut]]:
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
                        WHERE user_id = %s
                        ORDER BY name;
                        """,
                        [
                            user_id
                        ]
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

    def post(self, user_id: int, restaurant: RestaurantInWithListID) -> Union[RestaurantOut, Error]:
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
                    db.execute(
                        """
                        INSERT INTO restaurant_list_restaurant
                            (list_id, restaurant_id)
                        VALUES
                            (%s, %s)
                        """,
                        [
                            restaurant.list_id,
                            restaurant_id
                        ]
                    )
                    old_data = restaurant.dict()
                    print(old_data)
                    print(restaurant_id)
                    return RestaurantOut(restaurant_id=restaurant_id, **old_data)
        except Exception:
            return {"message": "Create did not work"}

    def record_to_restaurant_out(self, record):
        return RestaurantOut(
            restaurant_id=record[0],
            name=record[1],
            price=record[2],
            cuisine_id=record[3],
        )

    def restaurant_in_to_out(self, restaurant_id: int, restaurant: RestaurantIn):
        old_data = restaurant.dict()
        return RestaurantOut(restaurant_id=restaurant_id, **old_data)
