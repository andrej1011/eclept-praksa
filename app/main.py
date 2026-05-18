from fastapi import FastAPI

from app.api import auth

app = FastAPI(title="MovieMate API")

app.include_router(auth.router)

@app.get("/")
def index():
    return {"message": "MovieMate is running!"}