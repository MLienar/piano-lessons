import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {
    User, UserCreate, UserUpdate, LoginRequest, LoginResponse
} from '../types/auth'

const API_BASE_URL = 'http://localhost:8000'

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token')
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    }
}

// Raw API functions (for direct use or in mutations)
export const authApi = {
    // Login
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const formData = new URLSearchParams()
        formData.append('username', credentials.username)
        formData.append('password', credentials.password)

        const response = await fetch(`${API_BASE_URL}/auth/jwt/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.detail || 'Login failed')
        }

        return response.json()
    },

    // Register
    async register(userData: UserCreate): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/auth/register/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.detail || 'Registration failed')
        }

        return response.json()
    },

    // Get current user
    async getCurrentUser(): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: getAuthHeaders(),
        })

        if (!response.ok) {
            throw new Error('Failed to get user')
        }

        return response.json()
    },

    // Update current user
    async updateCurrentUser(userData: UserUpdate): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            throw new Error('Failed to update user')
        }

        return response.json()
    },

    // Get all users (admin only)
    async getUsers(): Promise<User[]> {
        const response = await fetch(`${API_BASE_URL}/auth/users/`, {
            headers: getAuthHeaders(),
        })

        if (!response.ok) {
            throw new Error('Failed to get users')
        }

        return response.json()
    },

    // Get user by ID
    async getUserById(userId: number): Promise<User> {
        const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
            headers: getAuthHeaders(),
        })

        if (!response.ok) {
            throw new Error('Failed to get user')
        }

        return response.json()
    },
}

// Token management
export const tokenManager = {
    setToken(token: string) {
        localStorage.setItem('auth_token', token)
    },

    getToken(): string | null {
        return localStorage.getItem('auth_token')
    },

    removeToken() {
        localStorage.removeItem('auth_token')
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token')
    },
}

// TanStack Query hooks
export const useAuthRepository = () => {
    const queryClient = useQueryClient()

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            tokenManager.setToken(data.access_token)
            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        onError: (error) => {
            console.error('Login failed:', error)
        },
    })

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            // Optionally auto-login after registration
            console.log('Registration successful:', data)
        },
        onError: (error) => {
            console.error('Registration failed:', error)
        },
    })

    // Get current user query
    const currentUserQuery = useQuery({
        queryKey: ['user', 'current'],
        queryFn: authApi.getCurrentUser,
        enabled: tokenManager.isAuthenticated(),
        retry: (failureCount, error) => {
            // Don't retry if unauthorized (token expired)
            if (error instanceof Error && error.message.includes('401')) {
                tokenManager.removeToken()
                return false
            }
            return failureCount < 3
        },
    })

    // Update user mutation
    const updateUserMutation = useMutation({
        mutationFn: authApi.updateCurrentUser,
        onSuccess: (data) => {
            // Update the user data in cache
            queryClient.setQueryData(['user', 'current'], data)
        },
        onError: (error) => {
            console.error('Update user failed:', error)
        },
    })

    // Logout function
    const logout = () => {
        tokenManager.removeToken()
        queryClient.clear() // Clear all cached data
    }

    return {
        // State
        token: tokenManager.getToken(),
        user: currentUserQuery.data || null,
        isAuthenticated: !!currentUserQuery.data && tokenManager.isAuthenticated(),
        loading: currentUserQuery.isLoading || loginMutation.isPending,
        isLoggingIn: loginMutation.isPending,
        isRegistering: registerMutation.isPending,
        isUpdating: updateUserMutation.isPending,

        // Actions
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        updateUser: updateUserMutation.mutateAsync,
        logout,
    }
}

// User management hooks (admin only)
export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: authApi.getUsers,
    })
}

export const useUser = (userId: number) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => authApi.getUserById(userId),
        enabled: !!userId,
    })
} 