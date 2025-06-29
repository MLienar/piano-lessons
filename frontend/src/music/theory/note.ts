import type { ChordTypeAbbreviation, Note as NoteLetter, IntervalType, } from "./types"

export class Note {
    private note: NoteLetter | undefined

    getNote(): NoteLetter {
        if (!this.note) {
            throw new Error("Note is not set")
        }
        return this.note
    }

    fromLetter(note: NoteLetter): void {
        this.note = note
    }

    fromInterval(note: Note, interval: IntervalType): void {
        this.note = addSemitones(note, interval)
    }

    getChord(type: ChordTypeAbbreviation): Chord {
        if (!this.note) {
            throw new Error("Note is not set")
        }
        return new Chord(this, type)
    }

}

class Chord {
    private root: Note
    private type: ChordTypeAbbreviation
    notes: Note[]

    constructor(root: Note, type: ChordTypeAbbreviation) {
        this.root = root
        this.type = type
        this.notes = this.getNotes(root, type)
    }

    getRoot(): Note {
        return this.root
    }

    getType(): ChordTypeAbbreviation {
        return this.type
    }

    getNotes(root: Note, type: ChordTypeAbbreviation): Note[] {
        const intervals = this.getIntervals(type)
        return intervals.map(interval => new Note().fromInterval(interval, root))
    }

    getIntervals(type: ChordTypeAbbreviation): Interval[] {

    }
}
