from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.restaurant_list import (
    Error,
    RestaurantListIn,
    RestaurantListRepository,
    RestaurantListOut,
)

router = APIRouter()


@router.post("/restaurant-list", response_model=Union[RestaurantListOut, Error])
def create_restaurant_list(
    restaurant_list: RestaurantListIn,
    response: Response,
    repo: RestaurantListRepository = Depends()
):
    # response.status_code = 400
    return repo.create(restaurant_list)
