import type {
  ChordTypeAbbreviation,
  IntervalAbbrevation,
  Note,
  NoteWithOctave,
  Octave,
} from "./types";

export const intervalTypeToSemitones: Record<IntervalAbbrevation, number> = {
  "": 0,
  m2: 1,
  M2: 2,
  m3: 3,
  M3: 4,
  P4: 5,
  "#4": 6,
  P5: 7,
  m6: 8,
  M6: 9,
  m7: 10,
  M7: 11,
  "8": 12,
  m9: 13,
  M9: 14,
  "#9": 15,
  "10": 16,
  "11": 17,
  "#11": 18,
  "12": 19,
  m13: 20,
  M13: 21,
};

export const chords: Record<ChordTypeAbbreviation, IntervalAbbrevation[]> = {
  "": ["", "M3", "P5"],
  m: ["", "m3", "P5"],
  dim: ["", "m3", "#4"],
  aug: ["", "M3", "m6"],
  "6": ["", "m3", "P5", "#4"],
  m6: ["", "m3", "P5", "#4"],
  "7": ["", "m3", "P5", "m7"],
  m7: ["", "m3", "P5", "m7"],
  M7: ["", "m3", "P5", "M7"],
  dim7: ["", "m3", "#4", "M6"],
  aug7: ["", "M3", "#4", "M7"],
  "9": ["", "m3", "P5", "M7", "M9"],
  m9: ["", "m3", "P5", "m7", "m9"],
  M9: ["", "M3", "P5", "M7", "M9"],
  "11": ["", "M3", "P5", "m7", "M9", "11"],
  m11: ["", "m3", "P5", "m7", "m9", "11"],
  M11: ["", "M3", "P5", "M7", "M9", "11"],
  "13": ["", "M3", "P5", "m7", "M9", "11", "M13"],
  m13: ["", "m3", "P5", "m7", "m9", "11", "m13"],
  M13: ["", "M3", "P5", "M7", "M9", "11", "M13"],
};
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
];

function isNote(arg: any): arg is Note {
  return Boolean(notes.find((n) => n.includes(arg)));
}

export function extractNote(note: NoteWithOctave): Note {
  const removed = note.slice(0, -1);
  if (!isNote(removed)) throw new Error("Incorrect note provided");
  return removed;
}

export function extractOctave(note: NoteWithOctave): Octave {
  const octave = Number(note[note.length - 1]);
  if (!isOctave(octave)) throw new Error("Bad octave on note");
  return octave;
}

function isOctave(arg: any): arg is Octave {
  return !isNaN(arg) && arg <= 12 && arg >= 0;
}

export function makeNoteWithOctave(note: Note, octave: Octave): NoteWithOctave {
  return `${note}${octave}`;
}

export function addSemitones(
  note: NoteWithOctave,
  semitones: number
): NoteWithOctave | null {
  const baseOctave = extractOctave(note);
  const noteIndex = notes.findIndex((n) => n.includes(extractNote(note)));
  const octavesToAdd = Math.floor((noteIndex + semitones) / notes.length);
  const newOctave = octavesToAdd + baseOctave;
  if (!isOctave(newOctave)) return null;
  const newNote = notes[Math.floor((noteIndex + semitones) % notes.length)];
  return `${newNote[0]}${newOctave}`;
}
