from typing import Annotated
from pydantic import AfterValidator
from password_validator import PasswordValidator

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