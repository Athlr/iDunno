from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.cuisine_list import (
    Error,
    CuisineListRepository,
    CuisinesOut,
)

router = APIRouter()

@router.get("/cuisine-list", response_model=Union[List[CuisinesOut], Error])
def get_cuisine_list(
    repo: CuisineListRepository = Depends()
):
    return repo.get()