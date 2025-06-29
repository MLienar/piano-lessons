import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '../contexts/AuthContext'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { user, isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Piano Lessons!
            </h1>
            <p className="text-xl text-gray-600">
              Hello, {user?.first_name || user?.email}! Welcome to your piano learning journey.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Getting Started
            </h3>
            <p className="text-gray-600 mb-6">
              This is your personalized piano learning platform. More features coming soon!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/exercises"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Start Exercises
              </Link>
            </div>
            <div className="text-sm text-gray-500 mt-4">
              You're successfully logged in and ready to start learning.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Learn Piano with Structured Practice
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Track your piano practice, set goals, and improve your skills with our comprehensive practice management system.
          Whether you're a beginner or advanced player, we help you stay motivated and organized.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-3 border border-blue-600 text-blue-600 text-lg font-medium rounded-md hover:bg-blue-50 transition-colors"
          >
            Sign In
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Track Progress
              </h3>
              <p className="text-gray-600">
                Monitor your practice sessions and see your improvement over time.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Set Goals
              </h3>
              <p className="text-gray-600">
                Define practice goals and milestones to keep yourself motivated.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Stay Organized
              </h3>
              <p className="text-gray-600">
                Keep your practice routine organized and consistent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
