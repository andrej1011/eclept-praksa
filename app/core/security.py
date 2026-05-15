import bcrypt
from password_validator import PasswordValidator
from typing import Annotated
from pydantic import AfterValidator

_pwd_schema = (
    PasswordValidator()
    .min(8).max(255)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().no().spaces()
)

def _check_pwd(v: str) -> str:
    assert _pwd_schema.validate(v), "password must be more than 8 characters and contain uppercase letters, lowercase letters, and numbers"
    return v

Password = Annotated[str, AfterValidator(_check_pwd)]

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())