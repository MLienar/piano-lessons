import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import async_session_maker, Base
from models import User
from auth import UserManager
from fastapi_users.db import SQLAlchemyUserDatabase


async def create_superuser():
    """Create a superuser for the application"""
    # Create tables first
    async with async_session_maker() as session:
        await session.run_sync(Base.metadata.create_all)
    
    async with async_session_maker() as session:
        user_db = SQLAlchemyUserDatabase(session, User)
        user_manager = UserManager(user_db)
        
        # Check if superuser already exists
        existing_user = await user_db.get_by_email("admin@pianolessons.com")
        if existing_user:
            print("Superuser already exists!")
            return
        
        # Create superuser
        user_data = {
            "email": "admin@pianolessons.com",
            "password": "admin123",  # Change this in production!
            "is_superuser": True,
            "is_verified": True,
            "first_name": "Admin",
            "last_name": "User"
        }
        
        try:
            user = await user_manager.create(user_data)
            print(f"Superuser created successfully: {user.email}")
        except Exception as e:
            print(f"Error creating superuser: {e}")


if __name__ == "__main__":
    asyncio.run(create_superuser()) 