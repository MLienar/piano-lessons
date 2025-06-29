# Piano Lessons Backend - Authentication

This backend provides a complete authentication system using FastAPI Users for the Piano Lessons application.

## Features

- User registration and login with JWT tokens
- Password reset functionality
- Email verification (configured but needs email backend)
- User profile management
- Teacher/Student role management
- Superuser functionality

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a superuser (optional):
```bash
python create_superuser.py
```

3. Run the server:
```bash
uvicorn main:app --reload
```

## API Endpoints

### Authentication Endpoints

- `POST /auth/jwt/login` - Login with email and password
- `POST /auth/register` - Register a new user
- `POST /auth/jwt/logout` - Logout (invalidate token)
- `POST /auth/reset-password` - Request password reset
- `POST /auth/verify` - Verify email address

### User Management Endpoints

- `GET /auth/me` - Get current user information
- `PUT /auth/me` - Update current user information
- `GET /auth/users/teachers` - Get all teachers
- `POST /auth/users/{user_id}/make-teacher` - Make user a teacher (superuser only)

### User CRUD Endpoints (Superuser only)

- `GET /auth/users` - List all users
- `GET /auth/users/{user_id}` - Get specific user
- `PUT /auth/users/{user_id}` - Update user
- `DELETE /auth/users/{user_id}` - Delete user

## Usage Examples

### Register a new user
```bash
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe",
    "is_teacher": false
  }'
```

### Login
```bash
curl -X POST "http://localhost:8000/auth/jwt/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=student@example.com&password=password123"
```

### Get current user (with token)
```bash
curl -X GET "http://localhost:8000/auth/me" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite+aiosqlite:///./piano_lessons.db
```

### Database
The default configuration uses SQLite. For production, consider using PostgreSQL:

```python
# In database.py
DATABASE_URL = "postgresql+asyncpg://user:password@localhost/piano_lessons"
```

### Email Configuration
To enable email verification and password reset, configure an email backend in `auth.py`.

## Security Notes

1. Change the `SECRET` in `auth.py` to a secure random string
2. Use environment variables for sensitive configuration
3. Enable HTTPS in production
4. Consider rate limiting for authentication endpoints
5. Implement proper email verification in production

## Default Superuser

- Email: `admin@pianolessons.com`
- Password: `admin123`

**Important**: Change these credentials in production! 