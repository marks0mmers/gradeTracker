import { Record, RecordOf } from "immutable";

interface IRole {
    role: string;
    userId: string;
    id: string;
}

export const Role = Record<IRole>({
    role: "",
    userId: "",
    id: "",
});

export type Role = RecordOf<IRole>;
