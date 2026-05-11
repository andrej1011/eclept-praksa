from dotenv import dotenv_values


env_config = dotenv_values(".env")

class Settings:
    DATABASE_URL: str = env_config.get("DATABASE_URL")
    #POSTGRES_PORT: int = env_config.get("POSTGRES_PORT")
    APP_HOST: str = env_config.get("APP_HOST")
    APP_PORT: str = env_config.get("APP_PORT")


settings = Settings()