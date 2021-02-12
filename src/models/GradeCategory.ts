import { List, Record, RecordOf } from "immutable";
import { Grade } from "./Grade";

interface IGradeCategory {
    title: string;
    percentage: number;
    numberOfGrades: number;
    courseId: string;
    id: string;
    remainingGrades: number;
    currentAverage: number;
    guarenteedAverage: number;
    potentialAverage: number;
    grades: List<Grade>;
}

export const GradeCategory = Record<IGradeCategory>({
    title: "",
    percentage: 0,
    numberOfGrades: 0,
    courseId: "",
    id: "",
    remainingGrades: 0,
    currentAverage: 0,
    guarenteedAverage: 0,
    potentialAverage: 0,
    grades: List(),
});

export type GradeCategory = RecordOf<IGradeCategory>;
