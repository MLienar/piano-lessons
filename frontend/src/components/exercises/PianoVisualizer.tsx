import { Note } from "@/music/theory/note";
import type { NoteLetter as NoteLetter, NoteWithOctave } from "@/music/theory/types";
import { pianoKeys } from "@/music/theory/utils";
import { useChordStore } from '@/store';
import { useEffect, useRef } from 'react';

const NOTE_WIDTH = 45; // Width of each piano key in pixels
const NOTE_HEIGHT = 200; // Height of each piano key in pixels

const baseNoteToPosition: Record<Note["note"], number> = {
    A: 0,
    "A#": 0.5,
    "Bb": 0.5,
    B: 1,
    C: 2,
    "C#": 2.5,
    "Db": 2.5,
    D: 3,
    "D#": 3.5,
    "Eb": 3.5,
    E: 4,
    F: 5,
    "F#": 5.5,
    "Gb": 5.5,
    G: 6,
    "G#": 6.5,
    "Ab": 6.5,
}

export function PianoVisualizer() {

    return (
        <Piano>
            {pianoKeys.map((key) => <PianoKey pianoKey={key} key={key} />)}
        </Piano>
    )
}

const noteToPosition = (note: Note) => {
    // Find the index of this key in the pianoKeys array to get its relative position
    const keyIndex = note.getOctave()
    return baseNoteToPosition[note.getNote()] + keyIndex * 7; // 7 keys per octave
}


function Piano({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { activeChord } = useChordStore();

    useEffect(() => {
        if (!activeChord || !containerRef.current) return;
        // Scroll to the active chord note if it exists
        const activeNote = activeChord.getRoot()
        const currentPosition = containerRef.current.scrollLeft;
        const neededScroll = noteToPosition(new Note().fromNotewithOctave(`${activeNote}3`)) * NOTE_WIDTH - currentPosition;
        const scrollAmount = Math.max(neededScroll, 0); // Ensure we don't scroll into negative space
        containerRef.current.scroll({ left: scrollAmount, behavior: 'smooth' })
    }, [activeChord]);

    return (
        <div
            ref={containerRef}
            className="flex w-full h-full overflow-x-scroll overflow-y-clip relative"
        >
            {children}
        </div>
    )
}


function PianoKey({ pianoKey }: { pianoKey: NoteWithOctave }) {
    const { activeChord } = useChordStore();
    const note = new Note().fromNotewithOctave(pianoKey);

    console.log(pianoKey)
    const isPlayed = (pianoKey: NoteLetter) => {
        if (!activeChord) return false;
        return activeChord.getNotes().includes(pianoKey);
    }


    const isKeyPlayed = isPlayed(note.getNote());
    const actualHeight = note.isSharp() ? NOTE_HEIGHT * 0.7 : NOTE_HEIGHT; // Adjust height for sharps
    const actualWidth = note.isSharp() ? NOTE_WIDTH * 0.7 : NOTE_WIDTH; // Adjust width for sharps 
    return (
        <div
            id={note.getNoteWithOctave()}
            className={`
                absolute top-0 transition-colors duration-300 ease-out rounded-b
                ${note.isSharp()
                    ? ` z-20 text-white transform translate-x-1/4 ${isKeyPlayed ? 'bg-blue-600 border border-blue-400' : 'bg-black'
                    }`
                    : ` z-10 border  ${isKeyPlayed ? 'bg-blue-100 border border-blue-400' : 'bg-white border-gray-300'
                    }`
                }
            `}
            style={{
                width: actualWidth,
                height: actualHeight,
                left: noteToPosition(note) * NOTE_WIDTH,
            }}>
            <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs">
                {note.getNoteWithOctave()}
            </p>
        </div>
    )
}