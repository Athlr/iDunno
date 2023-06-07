from fastapi.testclient import TestClient
from pydantic import BaseModel
from authenticator import authenticator
from typing import Union, List
from main import app
from queries.cuisine_list import CuisineListRepository, Error

client = TestClient(app)

class CuisineOut(BaseModel):
    cuisine_id: int
    name: str
    
# def fake_cuisine_data():
#     return CuisineOut(
#         cuisine_id = 1,
#         name = 'Test' 
#     )
class EmptyCuisineRepository:
   def get(self) -> Union[Error, List[CuisineOut]]:
       return [CuisineOut(cuisine_id=1, name="name")]
       
def test_get_all_cuisines():
    app.dependency_overrides[CuisineListRepository] = EmptyCuisineRepository
    expected = [{
        "cuisine_id": 1,
        "name": "name",
    }]
    
    response = client.get("/cuisine-list")
    app.dependency_overrides = {}
    
    assert response.status_code == 200
    assert response.json() == expected