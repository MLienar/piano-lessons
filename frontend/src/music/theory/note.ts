import type {
  ChordTypeAbbreviation,
  Note as NoteLetter,
  IntervalType,
  Octave,
  NoteWithOctave,
  IntervalAbbrevation,
} from "./types";
import {
  addSemitones,
  chords,
  extractNote,
  extractOctave,
  intervalTypeToSemitones,
  makeNoteWithOctave,
} from "./utils";

/**
 *  @class Note
 *  Note abstraction
 *  ----
 *  Defaults to C4, can be overriden
 */
export class Note {
  private note: NoteLetter;
  private octave: Octave;

  constructor(note: NoteLetter = "C", octave: Octave = 4) {
    this.note = note;
    this.octave = octave;
  }

  getNote(): NoteLetter {
    if (!this.note) {
      throw new Error("Note is not set");
    }
    return this.note;
  }

  getNoteWithOctave(): NoteWithOctave {
    if (!this.note) {
      throw new Error("Note is not set");
    }
    return makeNoteWithOctave(this.note, this.octave);
  }

  fromLetter(note: NoteLetter, octave: Octave = 4): Note {
    this.note = note;
    this.octave = octave;
    return this;
  }

  fromNotewithOctave(note: NoteWithOctave): Note {
    this.note = extractNote(note);
    this.octave = extractOctave(note);
    return this;
  }

  fromInterval(
    note: NoteLetter,
    interval: IntervalAbbrevation,
    octave: Octave = 4
  ): Note {
    const noteWithOctave = makeNoteWithOctave(note, octave ?? 4);
    const newNote = addSemitones(
      noteWithOctave,
      intervalTypeToSemitones[interval]
    );
    if (!newNote) throw new Error("Error building note from interval");
    this.note = extractNote(newNote);
    this.octave = extractOctave(newNote);
    return this;
  }

  getChord(type: ChordTypeAbbreviation): Chord {
    if (!this.note) {
      throw new Error("Note is not set");
    }
    return new Chord(this.note, type);
  }
}

class Chord {
  private root: NoteLetter;
  private type: ChordTypeAbbreviation;

  constructor(root: NoteLetter, type: ChordTypeAbbreviation) {
    this.root = root;
    this.type = type;
  }

  getRoot(): NoteLetter {
    return this.root;
  }

  getType(): ChordTypeAbbreviation {
    return this.type;
  }

  getNotes(): NoteLetter[] {
    const intervals = this.getIntervals(this.type);
    return intervals.map((interval) =>
      new Note().fromInterval(this.root, interval, 4).getNote()
    );
  }

  getIntervals(type: ChordTypeAbbreviation): IntervalAbbrevation[] {
    return chords[type];
  }
}
