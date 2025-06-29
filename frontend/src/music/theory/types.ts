export type Note =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "A♭"
  | "B♭"
  | "C♭"
  | "D♭"
  | "E♭"
  | "F♭"
  | "G♭"
  | "A#"
  | "B#"
  | "C#"
  | "D#"
  | "E#"
  | "F#"
  | "G#";

export type FlatNote = "A♭" | "B♭" | "C♭" | "D♭" | "E♭" | "F♭" | "G♭";
export type SharpNote = "A#" | "B#" | "C#" | "D#" | "E#" | "F#" | "G#";

export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type NoteWithOctave = `${Note}${Octave}`;

type Triad = "major" | "minor" | "diminished" | "augmented";
type TriadAbbreviation = "" | "m" | "dim" | "aug";
type Sixth = "major sixth" | "minor sixth";
type SixthAbbreviation = "6" | "m6";
type Seventh =
  | "dominant seventh"
  | "major seventh"
  | "minor seventh"
  | "diminished seventh"
  | "augmented seventh";
type SeventhAbbreviation = "M7" | "7" | "m7" | "dim7" | "aug7";
type Ninth = "major ninth" | "minor ninth" | "dominant ninth";
type NinthAbbreviation = "9" | "m9" | "M9";
type Eleventh = "major eleventh" | "minor eleventh" | "dominant eleventh";
type EleventhAbbreviation = "11" | "m11" | "M11";
type Thirteenth =
  | "major thirteenth"
  | "minor thirteenth"
  | "dominant thirteenth";
type ThirteenthAbbreviation = "13" | "m13" | "M13";
export type ChordType = Triad | Sixth | Seventh | Ninth | Eleventh | Thirteenth;
export type ChordTypeAbbreviation =
  | TriadAbbreviation
  | SixthAbbreviation
  | SeventhAbbreviation
  | NinthAbbreviation
  | EleventhAbbreviation
  | ThirteenthAbbreviation;

export type ChordNotation = `${Note}${ChordTypeAbbreviation}`;

export type Interval = {
  name: string;
  semitones: number;
  abbreviation: IntervalAbbrevation;
};

export type IntervalType =
  | "unison"
  | "minor second"
  | "major second"
  | "minor third"
  | "major third"
  | "perfect fourth"
  | "tritone"
  | "perfect fifth"
  | "minor sixth"
  | "major sixth"
  | "minor seventh"
  | "major seventh"
  | "octave"
  | "minor ninth"
  | "major ninth"
  | "minor tenth"
  | "major tenth"
  | "perfect eleventh"
  | "aug eleventh"
  | "perfect twelvth"
  | "minor thirteenth"
  | "major thirteenth";

export type IntervalAbbrevation =
  | ""
  | "m2"
  | "M2"
  | "m3"
  | "M3"
  | "P4"
  | "#4"
  | "P5"
  | "m6"
  | "M6"
  | "m7"
  | "M7"
  | "8"
  | "m9"
  | "M9"
  | "#9"
  | "10"
  | "11"
  | "#11"
  | "12"
  | "m13"
  | "M13";
