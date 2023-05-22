from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
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


@router.delete("/restaurant-list/{list_id}", response_model=bool)
def delete_restaurant_list(
    list_id: int,
    repo: RestaurantListRepository = Depends(),
) -> bool:
    return repo.delete(list_id)


@router.get("/restaurant-list/{list_id}", response_model=Optional[RestaurantListOut])
def get_one_restaurant_list(
    list_id: int,
    response: Response,
    repo: RestaurantListRepository = Depends(),
) -> RestaurantListOut:
    restaurant_list = repo.get_one(list_id)
    if restaurant_list is None:
        response.status_code = 404
    return restaurant_list
