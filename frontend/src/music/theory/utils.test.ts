import { addSemitones } from "./utils";

describe("addSemitone", () => {
  it("returns the correct note when semitones ", () => {
    const CToDSharp = addSemitones("C4", 3);
    expect(CToDSharp).toEqual("D#4");

    const C4ToC5 = addSemitones("C4", 12);
    expect(C4ToC5).toEqual("C5");

    const DSharp6ToE7 = addSemitones("D#6", 13);
    expect(DSharp6ToE7).toEqual("E7");
  });
});
