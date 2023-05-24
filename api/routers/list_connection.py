from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from authenticator import authenticator
from queries.list_connection import (
    Error,
    ListConnectionIn,
    ListConnectionRepository,
    ListConnectionOut,
)

router = APIRouter()


@router.post("/list-connection", response_model=Union[ListConnectionOut, Error])
def create_list_connection(
    list_connection: ListConnectionIn,
    response: Response,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: ListConnectionRepository = Depends()
):
    return repo.create(account_data["id"], list_connection)


@router.delete("/list-connection/{connection_id}", response_model=bool)
def delete_list_connection(
    connection_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: ListConnectionRepository = Depends(),
) -> bool:
    return repo.delete(account_data["id"], connection_id)


@router.get("/list-connection", response_model=Union[List[ListConnectionOut], Error])
def get_all_list_connections(
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: ListConnectionRepository = Depends(),
):
    return repo.get_all(account_data["id"])


@router.get("/list-connection/{connection_id}", response_model=Optional[ListConnectionOut])
def get_one_list_connection(
    connection_id: int,
    response: Response,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: ListConnectionRepository = Depends(),
) -> ListConnectionOut:
    list_connection = repo.get_one(connection_id)
    if list_connection is None:
        response.status_code = 404
    return list_connection
