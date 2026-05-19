from pydantic import BaseModel, Field, EmailStr, model_validator
from pydantic_extra_types.phone_numbers import PhoneNumber
from app.core.security import Password

class AuthBase(BaseModel):
    username: str = Field(min_length=3, max_length=32)
    password: Password

class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(AuthBase):
    confirm_password: str
    first_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)
    email: EmailStr | None = None
    phone_number: PhoneNumber | None = None

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("passwords do not match")
        return self
    
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"