from dotenv import dotenv_values
from zoneinfo import ZoneInfo

env_config = dotenv_values(".env")

class Settings:
    DATABASE_URL: str = env_config.get("DATABASE_URL")
    #POSTGRES_PORT: int = env_config.get("POSTGRES_PORT")
    APP_HOST: str = env_config.get("APP_HOST")
    APP_PORT: str = env_config.get("APP_PORT")

class Timezone:
        # separated from Settings so Booking ORM doesn't have to import all of the sensitive data from env 
        SERVER_TIMEZONE = ZoneInfo(env_config.get("SERVER_TIMEZONE"))

class JWT_Settings:
    JWT_SECRET: str = env_config.get("JWT_SECRET")
    JWT_ALGORITHM: str = env_config.get("JWT_ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(env_config.get("ACCESS_TOKEN_EXPIRE_MINUTES"))


settings = Settings()
timezone = Timezone()
jwt_settings = JWT_Settings()