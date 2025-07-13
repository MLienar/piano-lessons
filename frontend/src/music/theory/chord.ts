import { Note } from "./note";
import type { ChordTypeAbbreviation, IntervalAbbrevation, Note as NoteLetter } from "./types";
import { chords } from "./utils";

export class Chord {
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
