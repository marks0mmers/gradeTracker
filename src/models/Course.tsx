import { Record } from "immutable";

export const CourseRecord = Record({
    creditHours: 0,
    description: "",
    id: "",
    section: 0,
    title: "",
    userId: "",
});

export class Course extends CourseRecord {
    public title: string;
    public description: string;
    public section: number;
    public creditHours: number;
    public userId: string;
    public id?: string;
}
