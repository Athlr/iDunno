from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from authenticator import authenticator
from queries.friend_requests import (
    Error,
    FriendRequestIn,
    FriendRequestOut,
    FriendRequestsRepo,
)

router = APIRouter()

@router.get("/requests", response_model=Union[List[FriendRequestOut], Error])
def get_friend_requests(
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: FriendRequestsRepo = Depends(),
):
    return repo.get_friend_requests(account_data["id"])
