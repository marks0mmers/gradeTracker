import { Record } from "immutable";

export const AnalysisCourseRecord = Record({
    creditHours: 0,
    currentGPA: 0,
    currentLetter: "F",
    guarenteedGPA: 0,
    guarenteedLetter: "F",
    potentialGPA: 0,
    potentialLetter: "F",
    title: "",
});

export class AnalysisCourse extends AnalysisCourseRecord {
    public title: string;
    public creditHours: number;
    public currentGPA: number;
    public guarenteedGPA: number;
    public potentialGPA: number;
    public currentLetter: string;
    public guarenteedLetter: string;
    public potentialLetter: string;
}
