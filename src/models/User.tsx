import { Record } from "immutable";

export interface LoginUser {
    email: string;
    password: string;
}

export const UserRecord = Record({
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
    password: undefined,
    _id: "",
});

export class User extends UserRecord {
    public firstName: string;
    public lastName: string;
    public email: string;
    public isAdmin: boolean;
    public password?: string;
    public _id: string;
}
