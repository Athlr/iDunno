from pydantic import BaseModel
from queries.pool import pool
from typing import Union, List


class Error(BaseModel):
    message: str


class SponsoredIn(BaseModel):
    name: str
    price: str
    cuisine_id: int


class SponsoredOut(BaseModel):
    restaurant_id: int
    name: str
    price: str
    cuisine_id: int
    suggested: bool


class SponsoredRepository:
    

    def get(self) -> Union[Error, List[SponsoredOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT restaurant_id, name, price, cuisine_id, suggested
                        FROM restaurant
                        WHERE suggested = true
                        ORDER BY name;
                        """
                    )
                    suggested_list = []
                    for record in result:
                        restaurant = SponsoredOut(
                            restaurant_id=record[0],
                            name=record[1],
                            price=record[2],
                            cuisine_id=record[3],
                            suggested=record[4]
                        )
                        suggested_list.append(restaurant)
                    return suggested_list
        except Exception as e :
            print(e)
            return {"message": "Could not get all sponsored"}