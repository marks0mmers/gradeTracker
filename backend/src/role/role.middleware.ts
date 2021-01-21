import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../auth/Auth";
import { RoleException } from "../exceptions/RoleException";
import { RoleDTO } from "../role/role.schema";
import { userDatabase, UserDatabaseDTO } from "../user/user.schema";

export const userHasRole = (...roles: string[]) => async (req: RequestWithUser & Request, res: Response, next: NextFunction) => {
    const user: UserDatabaseDTO = await userDatabase.findById(req.user._id).populate("roles").exec();
    const doesUserHaveRole = user.roles ? user.roles.some((role: RoleDTO) => roles.indexOf(role.role) >= 0) : false;
    if (doesUserHaveRole) {
        next();
    } else {
        next(new RoleException("Cannot perform this action"));
    }
};
