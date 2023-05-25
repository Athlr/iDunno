from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from authenticator import authenticator
from queries.friendships import (
    Error,
    FriendshipIn,
    FriendshipOut,
    FriendOut,
    FriendshipsRepo,
)

router = APIRouter()

@router.get("/friends", response_model=Union[List[FriendshipOut], Error])
def get_friends(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FriendshipsRepo = Depends(),
):
    return repo.get_friends(account_data["id"])

@router.get("/friends/{friend_id}", response_model=Optional[FriendOut])
def get_friend(
    friend_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FriendshipsRepo = Depends(),
):
    return repo.get_friend(account_data["id"], friend_id)

@router.delete("/friends/{friend_id}", response_model=bool)
def delete_friend(
    friend_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FriendshipsRepo = Depends(),
) -> bool:
    return repo.delete_friendship(account_data["id"], friend_id)
