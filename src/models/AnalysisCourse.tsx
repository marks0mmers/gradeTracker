import { Record, RecordOf } from "immutable";

interface IAnalysisCourse {
    title: string;
    creditHours: number;
    currentGPA: number;
    guarenteedGPA: number;
    potentialGPA: number;
    currentLetter: string;
    guarenteedLetter: string;
    potentialLetter: string;
}

export const AnalysisCourse = Record<IAnalysisCourse>({
    creditHours: 0,
    currentGPA: 0,
    currentLetter: "F",
    guarenteedGPA: 0,
    guarenteedLetter: "F",
    potentialGPA: 0,
    potentialLetter: "F",
    title: "",
});

export type AnalysisCourse = RecordOf<IAnalysisCourse>;
