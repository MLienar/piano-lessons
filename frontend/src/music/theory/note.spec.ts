import { describe, expect, it } from "vitest";
import { Note } from "./note";

describe("Note", () => {
  describe("When a note is build from a letter", () => {
    it("returns the correct note", () => {
      const D = new Note().fromLetter("D");
      expect(D.getNote()).toEqual("D");
      expect(D.getChord("").getNotes()).toEqual(["D", "F#", "A"]);
      expect(D.getChord("m").getNotes()).toEqual(["D", "F", "A"]);
      expect(D.getChord("m7").getNotes()).toEqual(["D", "F", "A", "C"]);
      expect(D.getChord("m9").getNotes()).toEqual(["D", "F", "A", "C", "D#"]);
      expect(D.getChord("m11").getNotes()).toEqual([
        "D",
        "F",
        "A",
        "C",
        "D#",
        "G",
      ]);
      expect(D.getChord("m13").getNotes()).toEqual([
        "D",
        "F",
        "A",
        "C",
        "D#",
        "G",
        "A#",
      ]);
    });
  });
});
