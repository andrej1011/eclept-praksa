from app.api.routes import auditorium
from fastapi import FastAPI

from app.api.routes import auth

app = FastAPI(title="MovieMate API")

app.include_router(auth.router)
app.include_router(auditorium.router)

@app.get("/")
def index():
    return {"message": "MovieMate is running!"}