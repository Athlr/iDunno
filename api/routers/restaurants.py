from fastapi import APIRouter, Depends, Response
from queries.restaurants import RestaurantIn, RestaurantRepository, RestaurantOut, Error
from authenticator import authenticator
from typing import Optional, Union

router = APIRouter()


@router.post("/restaurants", response_model=Union[RestaurantOut, Error])
def create_restaurant(
    restaurants: RestaurantIn,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantRepository = Depends()
    ):
    print(account_data)
    return repo.post(account_data["id"], restaurants)