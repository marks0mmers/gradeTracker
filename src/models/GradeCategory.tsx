import { Map, Record } from "immutable";

export const GradeCategoryRecord = Record({
    currentAverage: 0,
    grades: Map(),
    guarenteedAverage: 0,
    numberOfGrades: 0,
    percentage: 0,
    potentialAverage: 100,
    remainingGrades: 0,
    title: "",
});

export class GradeCategory extends GradeCategoryRecord {
    public title: string;
    public percentage: number;
    public numberOfGrades: number;
    public remainingGrades: number;
    public currentAverage: number;
    public guarenteedAverage: number;
    public potentialAverage: number;
    public grades: Map<string, number>;
}
