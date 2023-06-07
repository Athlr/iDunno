from fastapi.testclient import TestClient
from pydantic import BaseModel
from authenticator import authenticator
from typing import Optional
from main import app
from queries import cuisine_list

client = TestClient(app)

class CuisineOut(BaseModel):
    cuisine_id = int
    name: str
    
