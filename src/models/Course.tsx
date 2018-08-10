import { List, Record } from "immutable";
import { GradeCategory } from "./GradeCategory";

export const CourseRecord = Record({
    categories: List(),
    creditHours: 0,
    description: "",
    section: "",
    title: "",
});

export class Course extends CourseRecord {
    public title: string;
    public description: string;
    public section: string;
    public creditHours: number;
    public categories?: List<GradeCategory>;
}
