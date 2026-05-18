from typing import Annotated
from pydantic import AfterValidator
from password_validator import PasswordValidator
from passlib.context import CryptContext

password_schema = (
    PasswordValidator()
    .min(8).max(255)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().no().spaces()
)

def check_password(v: str) -> str:
    if not password_schema.validate(v):
        raise ValueError("password must be more than 8 characters and contain uppercase letters, lowercase letters, and numbers")
    return v

Password = Annotated[str, AfterValidator(check_password)]

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return password_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return password_context.verify(plain, hashed)