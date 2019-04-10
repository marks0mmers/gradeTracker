import { List, Record } from "immutable";
import { Grade } from "./Grade";

export const GradeCategoryRecord = Record({
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

export class GradeCategory extends GradeCategoryRecord {
    public title: string;
    public percentage: number;
    public numberOfGrades: number;
    public courseId: string;
    public id: string;
    public remainingGrades: number;
    public currentAverage: number;
    public guarenteedAverage: number;
    public potentialAverage: number;
    public grades: List<Grade>;
}
