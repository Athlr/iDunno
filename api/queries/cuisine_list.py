from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool

class Error(BaseModel):
    message: str
    
class CuisinesOut(BaseModel):
    cuisine_id: int
    name: str

class CuisineListRepository:
    def get(self) -> Union[Error, List[CuisinesOut]]:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    query_results = db.execute(
                        """
                        SELECT cuisine_id, name
                        FROM cuisine
                        ORDER BY name
                        """
                    )
                    results = []
                    for record in query_results:
                        cuisine = CuisinesOut(
                            cuisine_id= record[0],
                            name= record[1]
                        )
                        results.append(cuisine)
                    return results

        