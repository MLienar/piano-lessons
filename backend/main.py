from typing import Union
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from models import User  # Import User model to register it
from routes import auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown
    await engine.dispose()


app = FastAPI(
    title="Piano Lessons API",
    description="API for piano lessons management with authentication",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include authentication routes
app.include_router(auth_router)

# Debug endpoint to check routes
@app.get("/debug/routes")
def debug_routes():
    routes = []
    for route in app.routes:
        if hasattr(route, 'path'):
            routes.append({
                "path": route.path,
                "name": route.name,
                "methods": [method for method in route.methods] if hasattr(route, 'methods') else []
            })
    return {"routes": routes}

# Health check endpoint
@app.get("/")
def read_root():
    return {"message": "Piano Lessons API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}