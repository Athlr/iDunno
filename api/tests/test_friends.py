from fastapi.testclient import TestClient
from pydantic import BaseModel
from authenticator import authenticator
from main import app
from queries.friendships import FriendshipsRepo
from queries.friend_requests import FriendRequestsRepo

client = TestClient(app)

class AccountOut(BaseModel):
    id: int
    email: str
    username: str
    first_name: str
    last_name: str
    profile_picture_url: str

def fake_account_data():
    data = AccountOut(
        id=1,
        email="user1@gmail.com",
        username="user1",
        first_name="first1",
        last_name="last1",
        profile_picture_url="fakeurl"
    )
    return {
        "id": data.id,
        "email": data.email,
        "username": data.username,
        "first_name": data.first_name,
        "last_name": data.last_name,
        "profile_picture_url": data.profile_picture_url,
    }

class EmptyFriendshipsRepo:
    def get_friends(self, account_id):
        return []

class EmptyFriendRequestsRepo:
    def create_friend_request(self, user_id, friend_request):
        return {
            "request_id": 1,
            "sender_id": user_id,
            "receiver_id": 2,
        }

def test_get_friends():
    #Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_account_data
    app.dependency_overrides[FriendshipsRepo] = EmptyFriendshipsRepo

    #Act
    response = client.get("/friends")
    app.dependency_overrides = {}

    #Assert
    assert response.status_code == 200
    assert response.json() == []

def test_create_friend_request():
    #Arrange
    app.dependency_overrides[authenticator.get_current_account_data] = fake_account_data
    app.dependency_overrides[FriendRequestsRepo] = EmptyFriendRequestsRepo
    json = {
        "receiver_username": "user2"
    }
    expected = {
        "request_id": 1,
        "sender_id": 1,
        "receiver_id": 2
    }

    #Act
    response = client.post("/requests", json=json)
    app.dependency_overrides = {}

    #Assert
    assert response.status_code == 200
    assert response.json() == expected
