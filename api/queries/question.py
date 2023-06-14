from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class QuestionOut(BaseModel):
    id: int
    name: str
    count: int


class QuestionIn(BaseModel):
    count: int


class QuestionRepository:
    def get(self) -> Union[Error, List[QuestionOut]]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                query_results = db.execute(
                    """
                    SELECT id, name, count
                    FROM options
                    ORDER BY name
                    """
                )
                results = []
                for record in query_results:
                    question = QuestionOut(id=record[0], name=record[1], count=record[2])
                    results.append(question)
                return results

    def update(self, id: int, question: QuestionIn) -> Union[bool, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE options
                        SET count = %s
                        WHERE id = %s
                        """,
                        [
                            question.count,
                            id
                        ]
                    )
                    return True
        except Exception as e:
            print(e)
            return {"message": "Could not update the question"}
