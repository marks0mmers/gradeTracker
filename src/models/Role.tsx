import { Record } from "immutable";

export const RoleRecord = Record({
    role: "",
    userId: "",
    id: "",
});

export class Role extends RoleRecord {
    public role: string;
    public userId: string;
    public id: string;
}
