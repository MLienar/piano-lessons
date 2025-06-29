import { Link } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const { user, isAuthenticated, logout, loading } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <header className="p-2 flex gap-2 bg-white text-black justify-between">
        <nav className="flex flex-row">
          <div className="px-2 font-bold">
            <Link to="/">Piano Lessons</Link>
          </div>
        </nav>
        <div className="text-gray-500">Loading...</div>
      </header>
    )
  }

  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between border-b">
      <nav className="flex flex-row items-center">
        <div className="px-2 font-bold text-lg">
          <Link to="/">Piano Lessons</Link>
        </div>

        {isAuthenticated && (
          <div className="px-2">
            <Link to="/exercises">Exercises</Link>
          </div>
        )}
      </nav>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <div className="text-sm text-gray-600">
              Welcome, {user?.first_name || user?.email}
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
