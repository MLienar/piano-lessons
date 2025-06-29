export interface User {
    id: number
    email: string
    first_name?: string
    last_name?: string
    is_active: boolean
    is_superuser: boolean
    is_verified: boolean
}

export interface UserCreate {
    email: string
    password: string
    first_name?: string
    last_name?: string
}

export interface UserUpdate {
    email?: string
    first_name?: string
    last_name?: string
}

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    access_token: string
    token_type: string
}

export interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
} 