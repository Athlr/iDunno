from fastapi import APIRouter, Depends, Response
from queries.restaurants import RestaurantIn, RestaurantRepository, RestaurantOut, Error, RestaurantInWithListID
from authenticator import authenticator
from typing import Optional, Union, List

router = APIRouter()


@router.post("/restaurants", response_model=Union[RestaurantOut, Error])
def create_restaurant(
    restaurants: RestaurantInWithListID,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: RestaurantRepository = Depends()
):
    return repo.post(account_data["id"], restaurants)

@router.get("/restaurants", response_model=Union[Error, List[RestaurantOut]])
def get_all(
    repo: RestaurantRepository = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
):
    return repo.get_all(account_data["id"])

@router.get("/restaurants/{restaurant_id}", response_model=Optional[RestaurantOut])
def get_one_restaurant(
    restaurant_id: int,
    response: Response,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantRepository = Depends(),
) -> RestaurantOut:
    restaurant = repo.get_one(account_data["id"], restaurant_id)
    if restaurant is None:
        response.status_code = 404
    return restaurant

@router.put("/restaurants/{restaurant_id}", response_model=Union[RestaurantOut, Error])
def update_restaurant(
    restaurant_id: int,
    restaurant: RestaurantIn,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantRepository = Depends(),
) -> Union[Error, RestaurantOut]:
    return repo.update(account_data["id"], restaurant_id, restaurant)

@router.delete("/restaurants/{restaurant_id}", response_model=bool)
def delete_restaurant(
    restaurant_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantRepository = Depends(),
) -> bool:
    return repo.delete(account_data["id"], restaurant_id)
