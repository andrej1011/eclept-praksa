from fastapi import FastAPI

app = FastAPI(title="MovieMate API")

@app.get("/")
def read_root():
    return {"message": "MovieMate is running!"}