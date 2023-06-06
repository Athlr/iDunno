from fastapi import APIRouter, Depends
from typing import Union, List
from queries.sponsored import Error, SponsoredRepository, SponsoredOut

router = APIRouter()


@router.get("/sponsored", response_model=Union[List[SponsoredOut], Error])
def get_suggested(repo: SponsoredRepository = Depends()):
    return repo.get()
