from typing import Optional
from fastapi_users import schemas
from pydantic import ConfigDict


class UserRead(schemas.BaseUser[int]):
    """Schema for reading user data"""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)


class UserCreate(schemas.BaseUserCreate):
    """Schema for creating a new user"""
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class UserUpdate(schemas.BaseUserUpdate):
    """Schema for updating user data"""
    first_name: Optional[str] = None
    last_name: Optional[str] = None 