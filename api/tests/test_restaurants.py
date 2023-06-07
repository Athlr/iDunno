from fastapi.testclient import TestClient
from pydantic import BaseModel
from authenticator import authenticator
from typing import Optional
from main import app
from queries.restaurants import RestaurantRepository

client = TestClient(app)


class RestaurantOut(BaseModel):
    restaurant_id: int
    name: str
    price: str
    cuisine_id: int


def fake_account_data():
    return {"id": 1}


class EmptyRestaurantRepository:
    def get_one(
        self, account_data: dict, restaurant_id: int
    ) -> Optional[RestaurantOut]:
        return RestaurantOut(
            restaurant_id=1, name="justin", price="$$$$", cuisine_id=1
        )


def test_get_one_restaurant():
    # Arrange
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_account_data
    app.dependency_overrides[RestaurantRepository] = EmptyRestaurantRepository
    expected = {
        "restaurant_id": 1,
        "name": "justin",
        "price": "$$$$",
        "cuisine_id": 1,
    }

    # Act
    response = client.get("/restaurants/1")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected
