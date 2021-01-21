import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { DataStoredInToken, TokenData } from "../auth/Auth";
import { Role, toRoleDTO } from "../role/role.model";
import { UserDTO } from "./user.schema";

export class User {

    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public roles?: Role[],
        public id?: string
    ) {}

    public setPassword(password: string) {
        this.password = bcrypt.hashSync(password, 10);
    }

    public validatePassword(passwordToCompare: string) {
        return bcrypt.compareSync(passwordToCompare, this.password);
    }

    public generateJWT(): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET || "secret";
        const dataStoredInToken: DataStoredInToken = {
            id: this.id
        };
        return {
            expiresIn,
            token: sign(dataStoredInToken, secret, { expiresIn })
        };
    }

    public toAuthJSON(): UserDTO {
        return {
            _id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            token: this.generateJWT().token,
            roles: this.roles.map((role: Role) => toRoleDTO(role))
        };
    }

    public toJSON() {
        return {
            _id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            roles: this.roles.map((role: Role) => toRoleDTO(role))
        };
    }

}
