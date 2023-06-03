from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool
from queries.restaurants import RestaurantOut, RestaurantIn


class Error(BaseModel):
    message: str


class RestaurantListIn(BaseModel):
    name: str
    description: Optional[str]
    user_id: int

class RestaurantListInPicture(RestaurantListIn):
    list_picture: Optional[str]

class RestaurantListOut(BaseModel):
    list_id: int
    name: str
    description: Optional[str]
    user_id: int

class RestaurantListOutPicture(RestaurantListOut):
    list_picture: Optional[str]

class RestaurantOutWithCuisine(BaseModel):
    restaurant_id: int
    name: str
    price: str
    cuisine_id: int
    cuisine_name: str



class RestaurantListRepository:
    def add_restaurant_to_list(self, list_id: int, restaurant_id: int) -> bool:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get a cursor
                with conn.cursor() as db:
                    # Run the INSERT statement
                    db.execute(
                        """
                        INSERT INTO restaurant_list_restaurant (list_id, restaurant_id)
                        VALUES (%s, %s)
                        """,
                        [list_id, restaurant_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def get_restaurants_in_list(self, list_id: int) -> List[RestaurantOutWithCuisine]:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get a cursor
                with conn.cursor() as db:
                    # Run the SELECT statement to fetch the restaurant IDs
                    result = db.execute(
                        """
                        SELECT restaurant_id
                        FROM restaurant_list_restaurant
                        WHERE list_id = %s
                        """,
                        [list_id]
                    )
                    # Fetch all the restaurant IDs
                    restaurant_ids = [record[0] for record in result]

                    # Fetch the complete restaurant data for each ID
                    restaurants = []
                    for restaurant_id in restaurant_ids:
                        result = db.execute(
                            """
                            SELECT r.restaurant_id, r.name, r.price, r.cuisine_id, c.name
                            FROM restaurant r
                            INNER JOIN cuisine c ON r.cuisine_id = c.cuisine_id
                            WHERE r.restaurant_id = %s
                            """,
                            [restaurant_id]
                        )
                        restaurant_data = result.fetchone()
                        if restaurant_data:
                            restaurant = RestaurantOutWithCuisine(
                                restaurant_id=restaurant_data[0],
                                name=restaurant_data[1],
                                price=restaurant_data[2],
                                cuisine_id=restaurant_data[3],
                                cuisine_name=restaurant_data[4]
                            )
                            restaurants.append(restaurant)

                    return restaurants
        except Exception as e:
            print(e)
            return []

    def update_restaurant_in_list(self, list_id: int, old_restaurant_id: int, new_restaurant_id: int) -> bool:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get a cursor
                with conn.cursor() as db:
                    # Run the UPDATE statement
                    db.execute(
                        """
                        UPDATE restaurant_list_restaurant
                        SET restaurant_id = %s
                        WHERE list_id = %s AND restaurant_id = %s
                        """,
                        [new_restaurant_id, list_id, old_restaurant_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def remove_restaurant_from_list(self, list_id: int, restaurant_id: int) -> bool:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get a cursor
                with conn.cursor() as db:
                    # Run the DELETE statement
                    db.execute(
                        """
                        DELETE FROM restaurant_list_restaurant
                        WHERE list_id = %s AND restaurant_id = %s
                        """,
                        [list_id, restaurant_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False






    def get_one(self, list_id: int) -> Optional[RestaurantListOutPicture]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT list_id, name, description, user_id, list_picture
                        FROM restaurant_list
                        WHERE list_id = %s
                        """,
                        [list_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_restaurant_list_out(record)
        except Exception as e:
            print(e)
            return None

    def delete(self, user_id: int, list_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM restaurant_list
                        WHERE list_id = %s
                        """,
                        [list_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, user_id: int, list_id: int, restaurant_list: RestaurantListInPicture) -> Union[RestaurantListOutPicture, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE restaurant_list
                        SET name = %s, description = %s, user_id = %s, list_picture = %s
                        WHERE list_id = %s
                        """,
                        [
                            restaurant_list.name,
                            restaurant_list.description,
                            user_id,
                            restaurant_list.list_picture,
                            list_id
                        ]
                    )
                    return self.restaurant_list_in_to_out(list_id, restaurant_list)
        except Exception as e:
            print(e)
            return Error(message="Could not update lists")

    def get_all(self, user_id: int) -> Union[Error, List[RestaurantListOutPicture]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT list_id, name, description, user_id, list_picture
                        FROM restaurant_list
                        WHERE user_id = %s
                        ORDER BY name
                        """,
                        [user_id]
                    )
                    result = db.fetchall()
                    return [
                        self.record_to_restaurant_list_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return Error(message="Could not get all lists")

    def get_all_by_user(self, user_id: int) -> Union[Error, List[RestaurantListOutPicture]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT list_id, name, description, user_id, list_picture
                        FROM restaurant_list
                        WHERE user_id = %s
                        ORDER BY name
                        """,
                        [user_id]
                    )
                    result = db.fetchall()
                    return [
                        self.record_to_restaurant_list_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return Error(message="Could not get all lists")

    def create(self, user_id: int, restaurant_list: RestaurantListInPicture) -> Union[RestaurantListOutPicture, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO restaurant_list (name, description, user_id, list_picture)
                        VALUES (%s, %s, %s, %s)
                        RETURNING list_id
                        """,
                        [
                            restaurant_list.name,
                            restaurant_list.description,
                            user_id,
                            restaurant_list.list_picture
                        ]
                    )
                    list_id = db.fetchone()[0]
                    return self.restaurant_list_in_to_out(list_id, restaurant_list)
        except Exception as e:
            print(e)
            return Error(message="Could not create list")

    def restaurant_list_in_to_out(self, list_id: int, restaurant_list: RestaurantListInPicture) -> RestaurantListOutPicture:
        return RestaurantListOutPicture(
            list_id=list_id,
            name=restaurant_list.name,
            description=restaurant_list.description,
            user_id=restaurant_list.user_id,
            list_picture=restaurant_list.list_picture,
        )

    def record_to_restaurant_list_out(self, record) -> RestaurantListOutPicture:
        return RestaurantListOutPicture(
            list_id=record[0],
            name=record[1],
            description=record[2],
            user_id=record[3],
            list_picture=record[4],
        )
