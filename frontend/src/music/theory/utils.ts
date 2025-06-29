import type { ChordTypeAbbreviation, IntervalType, Note } from "./types"

const intervalTypeToSemitones: Record<IntervalType, number> = {
    "unison": 0,
    "minor second": 1,
    "major second": 2,
    "minor third": 3,
    "major third": 4,
    "perfect fourth": 5,
    "tritone": 6,
    "perfect fifth": 7,
    "minor sixth": 8,
    "major sixth": 9,
    "minor seventh": 10,
    "major seventh": 11,
    "octave": 12,
}

const chords: Record<ChordTypeAbbreviation, number[]> = {
    "M": [0, intervalTypeToSemitones["major third"], intervalTypeToSemitones["perfect fifth"]],
    "m": [0, intervalTypeToSemitones["minor second"], intervalTypeToSemitones["perfect fifth"]],
    "dim": [0,]

}
const notes: Note[][] = [
    ["C"],
    ["C#", "D♭"],
    ["D"],
    ["D#", "E♭"],
    ["E"],
    ["F"],
    ["F#", "G♭"],
    ["G"],
    ["G#", "A♭"],
    ["A"],
    ["A#", "B♭"],
    ["B"],
]


function addSemitones(note: Note, interval: IntervalType): Note {
    const noteIndex = notes.findIndex(n => n.includes(note))
}