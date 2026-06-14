from dotenv import dotenv_values
import os

env_config = {**dotenv_values(".env"), **os.environ}


class Settings:
    DATABASE_URL: str = env_config.get("DATABASE_URL")
    #POSTGRES_PORT: int = env_config.get("POSTGRES_PORT")
    APP_HOST: str = env_config.get("APP_HOST")
    APP_PORT: str = env_config.get("APP_PORT")
    FRONTEND_HOST: str = env_config.get("FRONTEND_HOST")
    FRONTEND_PORT: str = env_config.get("FRONTEND_PORT")
    JWT_SECRET: str = env_config.get("JWT_SECRET")
    JWT_ALGORITHM: str = env_config.get("JWT_ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(env_config.get("ACCESS_TOKEN_EXPIRE_MINUTES"))


settings = Settings()