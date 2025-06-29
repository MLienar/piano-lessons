from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from auth import fastapi_users, current_active_user, current_superuser, auth_backend
from database import get_async_session
from models import User
from schemas import UserCreate, UserRead, UserUpdate

# Create router for authentication
auth_router = APIRouter(prefix="/auth", tags=["authentication"])

# Include FastAPI Users routes
auth_router.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/jwt",
    tags=["auth"],
)

# Registration router
auth_router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/register",
    tags=["auth"],
)

# Users router for user management
auth_router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

# Password reset router
auth_router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/reset-password",
    tags=["auth"],
)

# Email verification router
auth_router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/verify",
    tags=["auth"],
)

# Custom routes
@auth_router.get("/me", response_model=UserRead)
async def get_current_user(user: User = Depends(current_active_user)):
    """Get current user information"""
    return user


@auth_router.put("/me", response_model=UserRead)
async def update_current_user(
    user_update: UserUpdate,
    user: User = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session),
):
    """Update current user information"""
    # Update user fields
    for field, value in user_update.model_dump(exclude_unset=True).items():
        if hasattr(user, field):
            setattr(user, field, value)
    
    session.add(user)
    await session.commit()
    await session.refresh(user)
    
    return user 