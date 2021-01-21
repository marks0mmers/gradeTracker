import { Record, RecordOf } from "immutable";

interface ICourse {
    title: string;
    description: string;
    section: number;
    creditHours: number;
    userId: string;
    id?: string;
}

export const Course = Record<ICourse>({
    creditHours: 0,
    description: "",
    id: "",
    section: 0,
    title: "",
    userId: "",
});

export type Course = RecordOf<ICourse>;
