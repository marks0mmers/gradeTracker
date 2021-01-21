import { Record, RecordOf } from "immutable";

interface IGrade {
    name: string;
    grade: number;
    gradeCategoryId: string;
    id: string;
}

export const Grade = Record<IGrade>({
    name: "",
    grade: 0,
    gradeCategoryId: "",
    id: "",
});

export type Grade = RecordOf<IGrade>;
