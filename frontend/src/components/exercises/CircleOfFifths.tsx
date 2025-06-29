import { useState } from 'react'
import PianoVisualizer from './PianoVisualizer'

interface KeyInfo {
    key: string
    sharps: number
    flats: number
    color: string
}

const circleOfFifths: KeyInfo[] = [
    { key: 'C', sharps: 0, flats: 0, color: 'bg-green-100 border-green-300' },
    { key: 'G', sharps: 1, flats: 0, color: 'bg-blue-100 border-blue-300' },
    { key: 'D', sharps: 2, flats: 0, color: 'bg-purple-100 border-purple-300' },
    { key: 'A', sharps: 3, flats: 0, color: 'bg-indigo-100 border-indigo-300' },
    { key: 'E', sharps: 4, flats: 0, color: 'bg-pink-100 border-pink-300' },
    { key: 'B', sharps: 5, flats: 0, color: 'bg-red-100 border-red-300' },
    { key: 'F♯', sharps: 6, flats: 0, color: 'bg-orange-100 border-orange-300' },
    { key: 'C♯', sharps: 7, flats: 0, color: 'bg-yellow-100 border-yellow-300' },
    { key: 'F', sharps: 0, flats: 1, color: 'bg-teal-100 border-teal-300' },
    { key: 'B♭', sharps: 0, flats: 2, color: 'bg-cyan-100 border-cyan-300' },
    { key: 'E♭', sharps: 0, flats: 3, color: 'bg-emerald-100 border-emerald-300' },
    { key: 'A♭', sharps: 0, flats: 4, color: 'bg-lime-100 border-lime-300' },
    { key: 'D♭', sharps: 0, flats: 5, color: 'bg-amber-100 border-amber-300' },
    { key: 'G♭', sharps: 0, flats: 6, color: 'bg-rose-100 border-rose-300' },
    { key: 'C♭', sharps: 0, flats: 7, color: 'bg-slate-100 border-slate-300' },
]

// Map circle of fifths keys to their major and minor chord notes
const getChordForKey = (key: string, isMinor: boolean = false): string[] => {
    const majorChordMap: { [key: string]: string[] } = {
        'C': ['C4', 'E4', 'G4'],
        'G': ['G4', 'B4', 'D5'],
        'D': ['D4', 'F♯4', 'A4'],
        'A': ['A4', 'C♯5', 'E5'],
        'E': ['E4', 'G♯4', 'B4'],
        'B': ['B4', 'D♯5', 'F♯5'],
        'F♯': ['F♯4', 'A♯4', 'C♯5'],
        'C♯': ['C♯4', 'E♯4', 'G♯4'],
        'F': ['F4', 'A4', 'C5'],
        'B♭': ['B♭4', 'D5', 'F5'],
        'E♭': ['E♭4', 'G4', 'B♭4'],
        'A♭': ['A♭4', 'C5', 'E♭5'],
        'D♭': ['D♭4', 'F4', 'A♭4'],
        'G♭': ['G♭4', 'B♭4', 'D♭5'],
        'C♭': ['C♭4', 'E♭4', 'G♭4']
    }

    const minorChordMap: { [key: string]: string[] } = {
        'C': ['C4', 'E♭4', 'G4'],
        'G': ['G4', 'B♭4', 'D5'],
        'D': ['D4', 'F4', 'A4'],
        'A': ['A4', 'C5', 'E5'],
        'E': ['E4', 'G4', 'B4'],
        'B': ['B4', 'D5', 'F♯5'],
        'F♯': ['F♯4', 'A4', 'C♯5'],
        'C♯': ['C♯4', 'E4', 'G♯4'],
        'F': ['F4', 'A♭4', 'C5'],
        'B♭': ['B♭4', 'D♭5', 'F5'],
        'E♭': ['E♭4', 'G♭4', 'B♭4'],
        'A♭': ['A♭4', 'C♭5', 'E♭5'],
        'D♭': ['D♭4', 'E4', 'A♭4'],
        'G♭': ['G♭4', 'A4', 'D♭5'],
        'C♭': ['C♭4', 'D4', 'G♭4']
    }

    return isMinor ? (minorChordMap[key] || []) : (majorChordMap[key] || [])
}

export default function CircleOfFifths() {
    const [selectedKey, setSelectedKey] = useState<string>('C')
    const [isMinor, setIsMinor] = useState<boolean>(false)

    const getAccidentalSymbol = (type: 'sharp' | 'flat', count: number) => {
        if (count === 0) return ''
        const symbol = type === 'sharp' ? '♯' : '♭'
        return count === 1 ? symbol : `${count}${symbol}`
    }

    const handleKeyClick = (key: string) => {
        setSelectedKey(key)
    }

    return (
        <div className="space-y-6">
            {/* Chord Type Toggle */}
            <div className="flex justify-center">
                <div className="bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setIsMinor(false)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${!isMinor
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Major
                    </button>
                    <button
                        onClick={() => setIsMinor(true)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${isMinor
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Minor
                    </button>
                </div>
            </div>

            {/* Circle of Fifths Display */}
            <div className="flex flex-wrap justify-center gap-2">
                {circleOfFifths.map((keyInfo) => (
                    <div
                        key={keyInfo.key}
                        className={`
                            w-16 h-16 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105
                            ${keyInfo.color}
                            ${selectedKey === keyInfo.key ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}
                        `}
                        onClick={() => handleKeyClick(keyInfo.key)}
                    >
                        <div className="text-lg font-bold text-gray-800">
                            {keyInfo.key}
                        </div>
                        <div className="text-xs text-gray-600">
                            {keyInfo.sharps > 0 && getAccidentalSymbol('sharp', keyInfo.sharps)}
                            {keyInfo.flats > 0 && getAccidentalSymbol('flat', keyInfo.flats)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Key Information */}
            {selectedKey && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Key of {selectedKey} {isMinor ? 'Minor' : 'Major'}
                    </h3>
                    {(() => {
                        const keyInfo = circleOfFifths.find(k => k.key === selectedKey)
                        if (!keyInfo) return null

                        return (
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>
                                    <span className="font-medium">Key Signature:</span>{' '}
                                    {keyInfo.sharps > 0
                                        ? `${keyInfo.sharps} sharp${keyInfo.sharps > 1 ? 's' : ''}`
                                        : keyInfo.flats > 0
                                            ? `${keyInfo.flats} flat${keyInfo.flats > 1 ? 's' : ''}`
                                            : 'No sharps or flats'
                                    }
                                </p>
                                <p>
                                    <span className="font-medium">Chord Type:</span>{' '}
                                    {isMinor ? 'Minor Triad' : 'Major Triad'}
                                </p>
                                <p>
                                    <span className="font-medium">Chord Notes:</span>{' '}
                                    {getChordForKey(selectedKey, isMinor).join(', ')}
                                </p>
                                {!isMinor && (
                                    <p>
                                        <span className="font-medium">Relative Minor:</span>{' '}
                                        {getRelativeMinor(selectedKey)}
                                    </p>
                                )}
                                {isMinor && (
                                    <p>
                                        <span className="font-medium">Relative Major:</span>{' '}
                                        {getRelativeMajor(selectedKey)}
                                    </p>
                                )}
                            </div>
                        )
                    })()}
                </div>
            )}

            <PianoVisualizer chord={getChordForKey(selectedKey, isMinor)} />
        </div>
    )
}

function getRelativeMinor(majorKey: string): string {
    const relativeMinors: { [key: string]: string } = {
        'C': 'A', 'G': 'E', 'D': 'B', 'A': 'F♯', 'E': 'C♯', 'B': 'G♯', 'F♯': 'D♯', 'C♯': 'A♯',
        'F': 'D', 'B♭': 'G', 'E♭': 'C', 'A♭': 'F', 'D♭': 'B♭', 'G♭': 'E♭', 'C♭': 'A♭'
    }
    return relativeMinors[majorKey] || 'Unknown'
}

function getRelativeMajor(minorKey: string): string {
    const relativeMajors: { [key: string]: string } = {
        'A': 'C', 'E': 'G', 'B': 'D', 'F♯': 'A', 'C♯': 'E', 'G♯': 'B', 'D♯': 'F♯', 'A♯': 'C♯',
        'D': 'F', 'G': 'B♭', 'C': 'E♭', 'F': 'A♭', 'B♭': 'D♭', 'E♭': 'G♭', 'A♭': 'C♭'
    }
    return relativeMajors[minorKey] || 'Unknown'
} 