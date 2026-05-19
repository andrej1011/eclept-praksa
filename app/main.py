from fastapi import FastAPI

from app.api import auth,auditorium

app = FastAPI(title="MovieMate API")

app.include_router(auth.router)
app.include_router(auditorium.router)

@app.get("/")
def index():
    return {"message": "MovieMate is running!"}