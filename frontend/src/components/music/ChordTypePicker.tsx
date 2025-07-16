import type { ChordTypeAbbreviation } from "@/music/theory/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Chord type options with display names
const chordTypeOptions: { value: string; label: string; chordType: ChordTypeAbbreviation }[] = [
    { value: "major", label: "Major", chordType: "" },
    { value: "m", label: "Minor", chordType: "m" },
    { value: "dim", label: "Diminished", chordType: "dim" },
    { value: "aug", label: "Augmented", chordType: "aug" },
    { value: "6", label: "Major 6th", chordType: "6" },
    { value: "m6", label: "Minor 6th", chordType: "m6" },
    { value: "M7", label: "Major 7th", chordType: "M7" },
    { value: "7", label: "Dominant 7th", chordType: "7" },
    { value: "m7", label: "Minor 7th", chordType: "m7" },
    { value: "dim7", label: "Diminished 7th", chordType: "dim7" },
    { value: "aug7", label: "Augmented 7th", chordType: "aug7" },
    { value: "9", label: "Dominant 9th", chordType: "9" },
    { value: "m9", label: "Minor 9th", chordType: "m9" },
    { value: "M9", label: "Major 9th", chordType: "M9" },
    { value: "11", label: "Dominant 11th", chordType: "11" },
    { value: "m11", label: "Minor 11th", chordType: "m11" },
    { value: "M11", label: "Major 11th", chordType: "M11" },
    { value: "13", label: "Dominant 13th", chordType: "13" },
    { value: "m13", label: "Minor 13th", chordType: "m13" },
    { value: "M13", label: "Major 13th", chordType: "M13" },
];

interface ChordTypePickerProps {
    value: string;
    onValueChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    className?: string;
}

export function ChordTypePicker({
    value,
    onValueChange,
    label = "Chord Type",
    placeholder = "Select chord type",
    className = "w-64"
}: ChordTypePickerProps) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {chordTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

// Export helper function to get ChordTypeAbbreviation from string value
export function getChordTypeAbbreviation(value: string): ChordTypeAbbreviation {
    const option = chordTypeOptions.find(opt => opt.value === value);
    return option?.chordType || "";
}

// Export the options for use in other components if needed
export { chordTypeOptions };
