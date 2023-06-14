from fastapi import APIRouter, Depends
from typing import Union, List
from queries.question import Error, QuestionRepository, QuestionOut, QuestionIn

router = APIRouter()


@router.get("/question", response_model=Union[List[QuestionOut], Error])
def get(repo: QuestionRepository = Depends()):
    return repo.get()


@router.put("/question/{id}", response_model=Union[bool, Error])
def update(
    id: int,
    question: QuestionIn,
    repo: QuestionRepository = Depends(),
) -> Union[Error, bool]:
    return repo.update(id, question)
