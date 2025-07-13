import { Note } from "@/music/theory/note";
import type { Note as NoteLetter, NoteWithOctave } from "@/music/theory/types";
import { addSemitones, chords, extractNote, pianoKeys } from "@/music/theory/utils";
import "./PianoVisualizer.style.css";
import type { Chord } from "@/music/theory/chord";

export function PianoVisualizer({ chord }: { chord?: Chord }) {
    const isPlayed = (pianoKey: NoteLetter) => {
        if (!chord) return false;
        return chord.getNotes().includes(pianoKey);
    }
    return (
        <Piano>
            {pianoKeys.map((key) => <PianoKey pianoKey={key} isPlayed={isPlayed} key={key} />)}
        </Piano>
    )
}

function Piano({ children }: { children: React.ReactNode }) {
    return (
        <div className="piano-visualizer">
            {children}
        </div>
    )
}

const NOTE_WIDTH = 45; // Width of each piano key in pixels
const NOTE_HEIGHT = 200; // Height of each piano key in pixels

const baseNoteToPosition: Record<Note["note"], number> = {
    C: 0,
    "C#": 0.5,
    "D♭": 0.5,
    D: 1,
    "D#": 1.5,
    "E♭": 1.5,
    E: 2,
    F: 3,
    "F#": 3.5,
    "G♭": 3.5,
    G: 4,
    "G#": 4.5,
    "A♭": 4.5,
    A: 5,
    "A#": 5.5,
    "B♭": 5.5,
    B: 6,
}

function PianoKey({ pianoKey, isPlayed }: { isPlayed: (arg: NoteLetter) => boolean, pianoKey: NoteWithOctave }) {
    const note = new Note().fromNotewithOctave(pianoKey);

    const noteToPosition = (note: Note) => {
        const baseNote = note.getNote()
        return baseNoteToPosition[baseNote] + (note.getOctave() * 7);
    }

    const actualHeight = note.isSharp() ? NOTE_HEIGHT * 0.7 : NOTE_HEIGHT; // Adjust height for sharps
    const actualWidth = note.isSharp() ? NOTE_WIDTH * 0.7 : NOTE_WIDTH; // Adjust width for sharps 
    return (
        <div
            className={`piano-key piano-key ${note.isNatural() ? 'white' : 'black'} ${isPlayed(note.getNote()) ? 'played' : ''}`}
            style={{
                width: actualWidth,
                height: actualHeight,
                left: noteToPosition(note) * NOTE_WIDTH
            }}>
            <p className="piano-key-label">
                {note.getNoteWithOctave()}
            </p>
        </div>
    )
}