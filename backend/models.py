from typing import Optional
from fastapi_users.db import SQLAlchemyBaseUserTable
from sqlalchemy import String, Boolean, Integer
from sqlalchemy.sql.schema import Column
from database import Base


class User(SQLAlchemyBaseUserTable[int], Base):
    """User model for authentication"""
    
    __tablename__ = "user"
    
    # Primary key - required by FastAPI Users
    id = Column(Integer, primary_key=True)
    
    # Additional fields for piano lessons
    first_name = Column(String(length=128), nullable=True)
    last_name = Column(String(length=128), nullable=True)
    
    # These fields are required by FastAPI Users
    email = Column(String(length=320), unique=True, index=True, nullable=False)
    hashed_password = Column(String(length=1024), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False) 