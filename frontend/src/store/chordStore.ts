import { create } from 'zustand';
import { Chord } from '@/music/theory/chord';

interface ChordStore {
    activeChord: Chord;
    setActiveChord: (chord: Chord) => void;
}

export const useChordStore = create<ChordStore>((set) => ({
    activeChord: new Chord("C", ""), // Default to C Major
    setActiveChord: (chord: Chord) => set({ activeChord: chord }),
}));
