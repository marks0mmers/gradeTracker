import { Request } from "express";
import { UserDatabaseDTO } from "../user/user.schema";

export interface TokenData {
    token: string;
    expiresIn: number;
}

export const getTokenFromHeaders = (req: Request): string => {
    const { headers: { authorization } } = req;
    if (authorization && authorization.split(" ")[0] === "Bearer") {
        return authorization.split(" ")[1];
    }
    return null;
};

export interface DataStoredInToken {
    id: string;
}

export interface RequestWithUser {
  user: UserDatabaseDTO;
}
