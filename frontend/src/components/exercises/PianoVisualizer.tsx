import { useState } from 'react'

interface Note {
    name: string
    octave: number
    isBlack: boolean
    frequency: number
}

interface PianoVisualizerProps {
    chord?: string[] // Array of note names to highlight (e.g., ['C4', 'E4', 'G4'])
}

// Generate notes for two octaves starting from middle C (C4)
const generateNotes = (): Note[] => {
    const notes: Note[] = []
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    const blackKeys = ['C♯', 'D♯', 'F♯', 'G♯', 'A♯']

    // Middle C is C4
    for (let octave = 4; octave <= 5; octave++) {
        whiteKeys.forEach((note, index) => {
            const noteName = `${note}${octave}`
            const frequency = calculateFrequency(note, octave)
            notes.push({
                name: noteName,
                octave,
                isBlack: false,
                frequency
            })
        })
    }

    // Add black keys
    const blackKeyPositions = [0, 1, 3, 4, 5] // Positions relative to white keys
    for (let octave = 4; octave <= 5; octave++) {
        blackKeyPositions.forEach((position, index) => {
            const noteName = `${blackKeys[index]}${octave}`
            const frequency = calculateFrequency(blackKeys[index], octave)
            notes.push({
                name: noteName,
                octave,
                isBlack: true,
                frequency
            })
        })
    }

    return notes.sort((a, b) => a.frequency - b.frequency)
}

// Calculate frequency using A4 = 440Hz as reference
const calculateFrequency = (note: string, octave: number): number => {
    const A4 = 440
    const noteNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
    const noteIndex = noteNames.indexOf(note)
    const A4Index = noteNames.indexOf('A')
    const octaveDiff = octave - 4
    const semitoneDiff = noteIndex - A4Index + (octaveDiff * 12)

    return A4 * Math.pow(2, semitoneDiff / 12)
}

const notes = generateNotes()

export default function PianoVisualizer({ chord = [] }: PianoVisualizerProps) {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

    const handleKeyPress = (noteName: string) => {
        setPressedKeys(prev => {
            const newSet = new Set(prev)
            newSet.add(noteName)
            return newSet
        })

        // Remove the key after a short delay for visual effect
        setTimeout(() => {
            setPressedKeys(prev => {
                const newSet = new Set(prev)
                newSet.delete(noteName)
                return newSet
            })
        }, 200)
    }

    const getKeyClass = (note: Note) => {
        const isInChord = chord.includes(note.name)
        const isPressed = pressedKeys.has(note.name)

        let baseClass = note.isBlack
            ? 'bg-gray-800 text-white border-gray-900'
            : 'bg-white text-gray-800 border-gray-300'

        // Priority: chord highlight > pressed > default
        if (isInChord) {
            baseClass = note.isBlack
                ? 'bg-green-600 text-white border-green-700'
                : 'bg-green-200 text-gray-800 border-green-400'
        } else if (isPressed) {
            baseClass = note.isBlack
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-blue-200 text-gray-800 border-blue-400'
        }

        const sizeClass = note.isBlack
            ? 'w-8 h-20 -mx-4 z-10 absolute'
            : 'w-12 h-32'

        return `${baseClass} ${sizeClass} border rounded-b-lg cursor-pointer transition-colors duration-100 hover:opacity-80`
    }

    const getKeyPosition = (note: Note) => {
        if (note.isBlack) {
            // Map black keys to their correct positions between white keys
            // Each white key is 48px wide, so black keys are positioned at the center between white keys
            const blackKeyPositions: { [key: string]: number } = {
                'C♯4': 0, 'D♯4': 1, 'F♯4': 3, 'G♯4': 4, 'A♯4': 5,
                'C♯5': 7, 'D♯5': 8, 'F♯5': 10, 'G♯5': 11, 'A♯5': 12
            }

            const position = blackKeyPositions[note.name]
            if (position !== undefined) {
                // Position black key at the center between white keys (48px white key width)
                // Offset 35px to the right from the calculated center position
                return { left: `${(position * 48) + 51}px` }
            }
        }
        return {}
    }

    return (
        <div className="bg-gray-100 p-6 rounded-lg">
            <div className="relative flex justify-center">
                <div className="relative flex">
                    {/* White keys */}
                    {notes.filter(note => !note.isBlack).map((note) => (
                        <div
                            key={note.name}
                            className={getKeyClass(note)}
                            onClick={() => handleKeyPress(note.name)}
                        >
                            <div className="flex flex-col items-center justify-end h-full pb-2">
                                <div className="text-xs font-medium">
                                    {note.name}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Black keys positioned absolutely */}
                    {notes.filter(note => note.isBlack).map((note) => (
                        <div
                            key={note.name}
                            className={`absolute ${getKeyClass(note)}`}
                            style={getKeyPosition(note)}
                            onClick={() => handleKeyPress(note.name)}
                        >
                            <div className="flex flex-col items-center justify-end h-full pb-2">
                                <div className="text-xs font-medium">
                                    {note.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 