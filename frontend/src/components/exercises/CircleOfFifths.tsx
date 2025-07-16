import { useState, useEffect } from 'react';
import { Note } from "@/music/theory/note";
import type { NoteLetter, NoteWithOctave } from "@/music/theory/types";
import { addSemitones } from "@/music/theory/utils";
import { Chord } from '@/music/theory/chord';
import { ChordTypePicker, getChordTypeAbbreviation } from '@/components/music';
import { useChordStore } from '@/store';

const makeCircleOfFifths = (base: NoteWithOctave): Note[] => {
    const baseNote = base ?? 'C3'
    return new Array(12).fill(null).flatMap((_, i) => {
        const targetNote = addSemitones(baseNote, i * 7);
        if (!targetNote) return []
        return new Note().fromNotewithOctave(targetNote);
    })
}

interface CircleOfFifthsProps {
    // No props needed now since we're using global state
}

export function CircleOfFifths({ }: CircleOfFifthsProps) {
    const { activeChord, setActiveChord } = useChordStore();
    const [chordType, setChordType] = useState<string>("major");
    const [selectedNote, setSelectedNote] = useState<NoteLetter>('C');

    const circleOfFifths = makeCircleOfFifths('C3');

    const handleNoteClick = (note: Note) => {
        const noteLetter = note.getNote();
        setSelectedNote(noteLetter);
        const chord = new Chord(noteLetter, getChordTypeAbbreviation(chordType));
        setActiveChord(chord);
    };

    const handleChordTypeChange = (type: string) => {
        setChordType(type);
        const chordTypeAbbrev = getChordTypeAbbreviation(type);
        const chord = new Chord(selectedNote, chordTypeAbbrev);
        setActiveChord(chord);
    };

    const getCirclePosition = (index: number, total: number, radius: number = 120) => {
        const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
        return {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
        };
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            {/* Chord Type Selector */}
            <ChordTypePicker
                value={chordType}
                onValueChange={handleChordTypeChange}
            />

            {/* Circle of Fifths */}
            <div className="relative w-80 h-80 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
                <div className="absolute inset-8 border border-gray-300 rounded-full"></div>

                {circleOfFifths.map((note, index) => {
                    const position = getCirclePosition(index, circleOfFifths.length);
                    const isSelected = selectedNote === note.getNote();

                    return (
                        <button
                            key={`${note.getNote()}-${index}`}
                            onClick={() => handleNoteClick(note)}
                            className={`absolute w-12 h-12 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-110 ${isSelected
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400 shadow-md'
                                }`}
                            style={{
                                left: `calc(50% + ${position.x}px - 24px)`,
                                top: `calc(50% + ${position.y}px - 24px)`,
                            }}
                        >
                            {note.getNote()}
                        </button>
                    );
                })}
            </div>

            {/* Selected Chord Display */}
            <div className="text-center bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900">
                    Selected Chord: {selectedNote}{getChordTypeAbbreviation(chordType)}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                    Notes: {activeChord?.getNotes().join(', ') || 'None'}
                </p>
            </div>
        </div>
    );
}