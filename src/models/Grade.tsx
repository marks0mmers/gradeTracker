import { Record } from "immutable";

export const GradeRecord = Record({
    name: "",
    grade: 0,
    gradeCategoryId: "",
    id: "",
});

export class Grade extends GradeRecord {
    public name: string;
    public grade: number;
    public gradeCategoryId: string;
    public id: string;
}
