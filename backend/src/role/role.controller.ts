import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { RequestWithUser } from "../auth/Auth";
import { authMiddleware } from "../auth/auth.middleware";
import TYPES from "../config/types";
import { RoleException } from "../exceptions/RoleException";
import { userHasRole } from "../role/role.middleware";
import { RoleManager } from "./role.manager";
import { Role } from "./role.model";

@controller("/roles", authMiddleware, userHasRole("admin"))
export class RoleController {

    @inject(TYPES.RoleManager)
    private roleManager: RoleManager;

    @httpGet("/user/:userId")
    public async getAllRoles(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const userId: string = req.params.userId;
        try {
            const roles = await this.roleManager.getRolesForUser(userId);
            res.json(roles);
        } catch {
            next(new RoleException("Cannot get all roles"));
        }
    }

    @httpGet("/:roleId")
    public async getRole(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const roleId: string = req.params.roleId;
        try {
            const role = await this.roleManager.getRole(roleId);
            res.json(role);
        } catch {
            next(new RoleException("Cannot get role"));
        }
    }

    @httpPost("/user/:userId")
    public async createRole(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const role = new Role(
            req.body.role,
            req.params.userId
        );
        try {
            const createdRole = await this.roleManager.newRole(role);
            res.json(createdRole);
        } catch {
            next(new RoleException("Cannot create role"));
        }
    }

    @httpPut("/:roleId")
    public async updateRole(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const role = new Role(
            req.body.role,
            req.body.userId,
            req.params.roleId
        );
        try {
            const updatedRole = await this.roleManager.updateRole(role);
            res.json(updatedRole);
        } catch {
            next(new RoleException("Cannot update role"));
        }
    }

    @httpDelete("/:roleId")
    public async deleteRole(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        const roleId = req.params.roleId;
        try {
            const deletedRole = await this.roleManager.deleteRole(roleId);
            if (deletedRole) {
                res.json(deletedRole);
            } else {
                next(new RoleException("Cannot find role: " + roleId));
            }
        } catch {
            next(new RoleException("Cannot delete role"));
        }
    }

}
