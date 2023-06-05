from fastapi.testclient import TestClient
from pydantic import BaseModel
from authenticator import authenticator
from typing import Optional
from main import app
from queries.restaurant_list import RestaurantListRepository, RestaurantListOutPicture

client = TestClient(app)


class RestaurantListOut(BaseModel):
    list_id: int
    name: str
    description: Optional[str]
    user_id: int


def fake_restaurant_list_data():
    return RestaurantListOut(
        list_id=1,
        name="user",
        description="example",
        user_id=1
    )

class EmptyRestaurantListRepository:
    def get_one(self, list_id: int) -> Optional[RestaurantListOutPicture]:
        return RestaurantListOutPicture(
            list_id=1,
            name="name",
            description="description",
            user_id=1,
            list_picture="https://example.com/list_picture.jpg"
        )


def test_get_one_restaurant_list():
    # Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_restaurant_list_data
    app.dependency_overrides[RestaurantListRepository] = EmptyRestaurantListRepository
    expected = {
        "list_id": 1,
        "name": "name",
        "description": "description",
        "user_id": 1,
        "list_picture": "https://example.com/list_picture.jpg"
    }

    # Act
    response = client.get("/restaurant-list/1")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
