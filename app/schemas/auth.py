from typing import Annotated
from pydantic import AfterValidator
from password_validator import PasswordValidator

_pwd_schema = (
    PasswordValidator()
    .min(8).max(255)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().no().spaces()
)

def _check_pwd(v: str) -> str:
    if not _pwd_schema.validate(v):
        raise ValueError("password must be more than 8 characters and contain uppercase letters, lowercase letters, and numbers")
    return v

Password = Annotated[str, AfterValidator(_check_pwd)]