from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
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
    repo: ListConnectionRepository = Depends()
):
    return repo.create(list_connection)


@router.delete("/list-connection/{connection_id}", response_model=bool)
def delete_list_connection(
    connection_id: int,
    repo: ListConnectionRepository = Depends(),
) -> bool:
    return repo.delete(connection_id)


@router.get("/list-connection", response_model=Union[List[ListConnectionOut], Error])
def get_all_list_connections(
    repo: ListConnectionRepository = Depends(),
):
    return repo.get_all()


@router.get("/list-connection/{connection_id}", response_model=Optional[ListConnectionOut])
def get_one_list_connection(
    connection_id: int,
    response: Response,
    repo: ListConnectionRepository = Depends(),
) -> ListConnectionOut:
    list_connection = repo.get_one(connection_id)
    if list_connection is None:
        response.status_code = 404
    return list_connection
