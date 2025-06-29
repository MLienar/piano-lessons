import { createContext, useContext, type ReactNode } from 'react'
import { useAuthRepository } from '../lib/api'
import type { AuthState } from '../types/auth'

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>
    register: (userData: any) => Promise<void>
    logout: () => void
    updateUser: (userData: any) => Promise<void>
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user, token, isAuthenticated, login: loginMutation, register: registerMutation, logout, updateUser: updateUserMutation, loading } = useAuthRepository()

    async function login(email: string, password: string) {
        await loginMutation({ username: email, password })
    }

    async function register(userData: any) {
        await registerMutation(userData)
    }

    async function updateUser(userData: any) {
        await updateUserMutation(userData)
    }

    const value: AuthContextType = {
        user, token,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        loading,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}