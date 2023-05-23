from fastapi import APIRouter, Depends, Response
from queries.restaurants import RestaurantIn, RestaurantRepository, RestaurantOut, Error
from authenticator import authenticator
from typing import Optional, Union, List

router = APIRouter()


@router.post("/restaurants", response_model=Union[RestaurantOut, Error])
def create_restaurant(
    restaurants: RestaurantIn,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: RestaurantRepository = Depends()
    ):
    print(account_data)
    return repo.post(account_data["id"], restaurants)

@router.get("/restaurants", response_model=Union[Error, List[RestaurantOut]])
def get_all(
    repo: RestaurantRepository = Depends(),
):
    return repo.get_all()

@router.get("/restaurants/{restaurant_id}", response_model=Optional[RestaurantOut])
def get_one_restaurant(
    restaurant_id: int,
    response: Response,
    repo: RestaurantRepository = Depends(),
) -> RestaurantOut:
    restaurant = repo.get_one(restaurant_id)
    if restaurant is None:
        response.status_code = 404
    return restaurant