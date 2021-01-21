import { RoleDTO } from "./role.schema";

export class Role {
    constructor(
        public role: string,
        public userId: string,
        public id?: string
    ) {}
}

export const toRole = (roleDTO: RoleDTO): Role => {
    return new Role(
        roleDTO.role,
        roleDTO.userId,
        roleDTO._id
    );
};

export const toRoleDTO = (role: Role): RoleDTO => {
    return {
        _id: role.id,
        role: role.role,
        userId: role.userId
    };
};
