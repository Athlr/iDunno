from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from authenticator import authenticator
from queries.restaurant_list import (
    Error,
    RestaurantListIn,
    RestaurantListInPicture,
    RestaurantListRepository,
    RestaurantListOut,
    RestaurantListOutPicture,
    RestaurantOutWithCuisine
)


router = APIRouter()

@router.post("/restaurant_list/{list_id}/add-restaurant/{restaurant_id}", response_model=bool)
def add_restaurant_to_list(
    list_id: int,
    restaurant_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
) -> bool:
    return repo.add_restaurant_to_list(list_id, restaurant_id)


@router.get("/restaurant_list/{list_id}/restaurants", response_model=List[RestaurantOutWithCuisine])
def get_restaurants_in_list(
    list_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
) -> List[RestaurantOutWithCuisine]:
    print(f"Received request for list_id: {list_id}")
    return repo.get_restaurants_in_list(list_id)


@router.put("/restaurant_list/{list_id}/update-restaurant/{old_restaurant_id}/{new_restaurant_id}", response_model=bool)
def update_restaurant_in_list(
    list_id: int,
    old_restaurant_id: int,
    new_restaurant_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
) -> bool:
    return repo.update_restaurant_in_list(list_id, old_restaurant_id, new_restaurant_id)


@router.delete("/restaurant_list/{list_id}/remove-restaurant/{restaurant_id}", response_model=bool)
def remove_restaurant_from_list(
    list_id: int,
    restaurant_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
) -> bool:
    return repo.remove_restaurant_from_list(list_id, restaurant_id)













@router.post("/restaurant-list", response_model=Union[RestaurantListOutPicture, Error])
def create_restaurant_list(
    restaurant_list: RestaurantListInPicture,
    response: Response,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends()
):
    return repo.create(account_data["id"], restaurant_list)


@router.get("/restaurant-list", response_model=Union[List[RestaurantListOutPicture], Error])
def get_all_restaurant_lists(
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
):
    return repo.get_all(account_data["id"])

@router.get("/restaurant-list/user/{user_id}", response_model=Union[List[RestaurantListOutPicture], Error])
def get_all_restaurant_lists_by_user(
    user_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
):
    return repo.get_all_by_user(user_id)

@router.put("/restaurant-list/{list_id}", response_model=Union[RestaurantListOutPicture, Error])
def update_restaurant_list(
    list_id: int,
    restaurant_list: RestaurantListInPicture,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
) -> Union[Error, RestaurantListOutPicture]:
    return repo.update(account_data["id"], list_id, restaurant_list)


@router.delete("/restaurant-list/{list_id}", response_model=bool)
def delete_restaurant_list(
    list_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
) -> bool:
    return repo.delete(account_data["id"], list_id)


@router.get("/restaurant-list/{list_id}", response_model=Optional[RestaurantListOutPicture])
def get_one_restaurant_list(
    list_id: int,
    response: Response,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantListRepository = Depends(),
) -> Optional[RestaurantListOutPicture]:
    restaurant_list = repo.get_one(list_id)
    if restaurant_list is None:
        response.status_code = 404
    return restaurant_list
