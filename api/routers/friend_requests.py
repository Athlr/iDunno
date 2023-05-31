from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from authenticator import authenticator
from queries.friend_requests import (
    Error,
    MakeFriendRequestIn,
    MakeFriendRequestOut,
    FriendRequestOut,
    UpdateFriendRequest,
    FriendRequestsRepo,
)

router = APIRouter()

@router.get("/requests", response_model=Union[List[FriendRequestOut], Error])
def get_friend_requests(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FriendRequestsRepo = Depends(),
):
    return repo.get_friend_requests(account_data["id"])

@router.post("/requests", response_model=Union[MakeFriendRequestOut, Error])
def create_friend_request(
    friend_request: MakeFriendRequestIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FriendRequestsRepo = Depends(),
):
    return repo.create_friend_request(account_data["id"], friend_request)

@router.put("/requests/{request_id}", response_model=Union[UpdateFriendRequest, Error])
def update_friend_request(
    request_id: int,
    friend_request: UpdateFriendRequest,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FriendRequestsRepo = Depends(),
) -> Union[UpdateFriendRequest, Error]:
    return repo.update_friend_request(account_data["id"], request_id, friend_request)
