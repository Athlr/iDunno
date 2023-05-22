from pydantic import BaseModel
from typing import Optional, List, Union
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


    def delete(self, list_id: int) -> bool:
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

    def update(self, list_id: int, restaurant_list: RestaurantListIn) -> Union[RestaurantListOut, Error]:
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
                            restaurant_list.user_id,
                            list_id
                        ]
                    )
                    # old_data = restaurant_list.dict()
                    # return RestaurantListOut(list_id=list_id, **old_data)
                    return self.restaurant_list_in_to_out(list_id, restaurant_list)
        except Exception as e:
            print(e)
            return {"message": "could not update lists"}


    def get_all(self) -> Union[Error, List[RestaurantListOut]]:
        try:
            # connect the database
            with pool.connection() as conn:
                # get a cursor
                with conn.cursor() as db:
                    #Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT list_id, name, description, user_id
                        FROM restaurant_list
                        ORDER BY name;
                        """
                    )
                    # result = []
                    # for record in db:
                    #     restaurant_list = RestaurantListOut(
                    #             list_id=record[0],
                    #             name=record[1],
                    #             description=record[2],
                    #             user_id=record[3]
                    #     )
                    #     result.append(restaurant_list)
                    # return result

                    return [
                        self.record_to_restaurant_list_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "could not get all lists"}


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
