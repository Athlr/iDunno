from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    accounts,
    friendships,
    friend_requests,
    restaurant_list,
    restaurants,
    cuisine_list,
    sponsored,
    question,
)
import os
from authenticator import authenticator

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(friendships.router)
app.include_router(friend_requests.router)
app.include_router(restaurant_list.router)
app.include_router(restaurants.router)
app.include_router(cuisine_list.router)
app.include_router(sponsored.router)
app.include_router(question.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "This exists"}
