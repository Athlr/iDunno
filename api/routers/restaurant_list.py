from fastapi import APIRouter, Depends, Response
from typing import Union, List
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


@router.get("/restaurant-list", response_model=Union[List[RestaurantListOut], Error])
def get_all_restaurant_lists(
    repo: RestaurantListRepository = Depends(),
):
    return repo.get_all()

@router.put("/restaurant-list/{list_id}", response_model=Union[RestaurantListOut, Error])
def update_restaurant_list(
    list_id: int,
    restaurant_list: RestaurantListIn,
    repo: RestaurantListRepository = Depends(),
) -> Union[Error, RestaurantListOut]:
    return repo.update(list_id, restaurant_list)
