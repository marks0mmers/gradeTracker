import { List, Record } from "immutable";
import { Role } from "./Role";

export interface LoginUser {
    email: string;
    password: string;
}

export const UserRecord = Record({
    firstName: "",
    lastName: "",
    email: "",
    password: undefined,
    token: "",
    _id: "",
    roles: List<Role>(),
});

export class User extends UserRecord {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password?: string;
    public token?: string;
    public _id: string;
    public roles: List<Role>;
}

export interface UserGridView {
    firstName: string;
    lastName: string;
    email: string;
    _id: string;
}
