from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import MetaData

# Database URL - you can change this to your preferred database
DATABASE_URL = "sqlite+aiosqlite:///./piano_lessons.db"

# Create async engine
engine = create_async_engine(
    DATABASE_URL,
    echo=True,  # Set to False in production
)

# Create async session factory
async_session_maker = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Create declarative base
Base = declarative_base()

# Metadata for migrations
metadata = MetaData()

async def get_async_session() -> AsyncSession:
    async with async_session_maker() as session:
        yield session 