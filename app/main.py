from app.api.routes import auditorium,genre,movie,showing,booking,user
from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.scheduler import scheduler
from app.api.routes import auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.start()
    yield
    scheduler.shutdown()

app = FastAPI(lifespan=lifespan,title="MovieMate API")

app.include_router(auth.router)
app.include_router(auditorium.router)
app.include_router(genre.router)
app.include_router(movie.router)
app.include_router(showing.router)
app.include_router(booking.router)
app.include_router(user.router)



@app.get("/")
def index():
    return {"message": "MovieMate is running!"}