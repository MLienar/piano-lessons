import { createFileRoute } from '@tanstack/react-router'
import ProtectedRoute from '../components/auth/ProtectedRoute'

import { PianoVisualizer } from '@/components/exercises/PianoVisualizer'
import { CircleOfFifths } from '@/components/exercises/CircleOfFifths'

export const Route = createFileRoute('/exercises')({
    component: ExercisesPage,
})

function ExercisesPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Piano Exercises</h1>
                        <p className="mt-2 text-gray-600">
                            Practice fundamental music theory concepts
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Circle of Fifths - Major Keys
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Learn the circle of fifths for major keys. This fundamental concept helps you understand key signatures and chord progressions. Click on any key to see its details and the corresponding chord on the piano keyboard.
                            </p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <CircleOfFifths />
                                </div>

                                <div style={{ height: '300px' }}>
                                    <PianoVisualizer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
} 