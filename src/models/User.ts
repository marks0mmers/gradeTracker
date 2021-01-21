import { List, Record, RecordOf } from "immutable";
import { Role } from "./Role";

export interface LoginUser {
    email: string;
    password: string;
}

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    token?: string;
    _id: string;
    roles: List<Role>;
}

export const User = Record<IUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: undefined,
    token: "",
    _id: "",
    roles: List<Role>(),
});

export type User = RecordOf<IUser>;

export interface UserGridView {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
}
