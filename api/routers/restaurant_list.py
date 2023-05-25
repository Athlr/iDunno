from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from authenticator import authenticator
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
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends()
):
    # response.status_code = 400
    return repo.create(account_data["id"], restaurant_list)


@router.get("/restaurant-list", response_model=Union[List[RestaurantListOut], Error])
def get_all_restaurant_lists(
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
):
    return repo.get_all(account_data["id"])

@router.get("/restaurant-list/user/{user_id}", response_model=Union[List[RestaurantListOut], Error])
def get_all_restaurant_lists(
    user_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
):
    return repo.get_all_by_user(user_id)

@router.put("/restaurant-list/{list_id}", response_model=Union[RestaurantListOut, Error])
def update_restaurant_list(
    list_id: int,
    restaurant_list: RestaurantListIn,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
) -> Union[Error, RestaurantListOut]:
    return repo.update(account_data["id"], list_id, restaurant_list)


@router.delete("/restaurant-list/{list_id}", response_model=bool)
def delete_restaurant_list(
    list_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
) -> bool:
    return repo.delete(account_data["id"], list_id)


@router.get("/restaurant-list/{list_id}", response_model=Optional[RestaurantListOut])
def get_one_restaurant_list(
    list_id: int,
    response: Response,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
) -> RestaurantListOut:
    restaurant_list = repo.get_one(list_id)
    if restaurant_list is None:
        response.status_code = 404
    return restaurant_list
