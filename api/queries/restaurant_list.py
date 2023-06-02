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
    list_picture: str

class RestaurantListOut(BaseModel):
    list_id: int
    name: str
    description: Optional[str]
    user_id: int

class RestaurantListOutPicture(RestaurantListOut):
    list_picture: str

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




    # def get_restaurants_in_list(self, list_id: int) -> List[dict]:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     SELECT r.restaurant_id, r.name, r.price, r.cuisine_id
    #                     FROM restaurant r
    #                     INNER JOIN restaurant_list_restaurant rl ON r.restaurant_id = rl.restaurant_id
    #                     WHERE rl.list_id = %s
    #                     """,
    #                     [list_id]
    #                 )
    #                 result = db.fetchall()
    #                 restaurants = [
    #                     {
    #                         'restaurant_id': record[0],
    #                         'name': record[1],
    #                         'price': record[2],
    #                         'cuisine_id': record[3],
    #                     }
    #                     for record in result
    #                 ]
    #                 return restaurants
    #     except Exception as e:
    #         print(e)
    #         return []


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

    def get_one(self, list_id: int) -> Optional[RestaurantListOut]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT list_id
                             , name
                             , description
                             , user_id
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
            return {"message": "Could not get that Restaurant list"}


    def delete(self, user_id: int, list_id: int) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
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

    def update(self, user_id: int, list_id: int, restaurant_list: RestaurantListIn) -> Union[RestaurantListOut, Error]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    #Run our SELECT statement
                    db.execute(
                        """
                        UPDATE restaurant_list
                        SET name = %s
                          , description = %s
                          , user_id = %s
                        WHERE list_id = %s
                        """,
                        [
                            restaurant_list.name,
                            restaurant_list.description,
                            user_id,
                            list_id
                        ]
                    )
                    # old_data = restaurant_list.dict()
                    # return RestaurantListOut(list_id=list_id, **old_data)
                    return self.restaurant_list_in_to_out(list_id, restaurant_list)
        except Exception as e:
            print(e)
            return {"message": "could not update lists"}


    def get_all(self, user_id: int) -> Union[Error, List[RestaurantListOutPicture]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    #Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT list_id, name, description, user_id, list_picture
                        FROM restaurant_list
                        WHERE user_id = %s
                        ORDER BY name;
                        """,
                        [
                            user_id
                        ]
                    )
                    result = []
                    for record in db:
                        restaurant_list = RestaurantListOutPicture(
                                list_id=record[0],
                                name=record[1],
                                description=record[2],
                                user_id=record[3],
                                list_picture=record[4]
                        )
                        result.append(restaurant_list)
                    return result
                    # return [
                    #     self.record_to_restaurant_list_out(record)
                    #     for record in result
                    # ]
        except Exception as e:
            print(e)
            return {"message": "could not get all lists"}

    def get_all_by_user(self, user_id: int) -> Union[Error, List[RestaurantListOutPicture]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    #Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT list_id, name, description, user_id, list_picture
                        FROM restaurant_list
                        WHERE user_id = %s
                        ORDER BY name;
                        """,
                        [
                            user_id
                        ]
                    )
                    result = []
                    for record in db:
                        restaurant_list = RestaurantListOutPicture(
                                list_id=record[0],
                                name=record[1],
                                description=record[2],
                                user_id=record[3],
                                list_picture=record[4]
                        )
                        result.append(restaurant_list)
                    return result

                    # return [
                    #     self.record_to_restaurant_list_out(record)
                    #     for record in result
                    # ]
        except Exception as e:
            print(e)
            return {"message": "could not get all lists"}



    def create(self, user_id: int, restaurant_list: RestaurantListIn) -> RestaurantListOut:
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
                # old_data = restaurant_list.dict()
                # return RestaurantListOut(list_id=list_id, **old_data)
                return self.restaurant_list_in_to_out(list_id, restaurant_list)
        # except Exception as e:
        #     print(e)
        #     return {"message": "Create did not work!"}


    def restaurant_list_in_to_out(self, list_id: int, restaurant_list: RestaurantListIn):
        old_data = restaurant_list.dict()
        return RestaurantListOut(list_id=list_id, **old_data)

    def record_to_restaurant_list_out(self, record):
        return RestaurantListOut(
            list_id=record[0],
            name=record[1],
            description=record[2],
            user_id=record[3]
        )
