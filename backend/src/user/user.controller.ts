import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { RequestWithUser } from "../auth/Auth";
import { authMiddleware } from "../auth/auth.middleware";
import TYPES from "../config/types";
import { UserException } from "../exceptions/UserException";
import { userHasRole } from "../role/role.middleware";
import { UserManager } from "./user.manager";
import { User } from "./user.model";

@controller("/users")
export class UserController {

    @inject(TYPES.UserManager)
    private userManager: UserManager;

    @httpPost("/")
    public async newUser(req: Request, res: Response, next: NextFunction) {
        try {
            const createdUser = await this.userManager.newUser(req.body);
            res.json(createdUser.toAuthJSON());
        } catch {
            next(new UserException("Cannot create a new user"));
        }
    }

    @httpPost("/login")
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userManager.login(req.body);
            res.json(user.toAuthJSON());
        } catch {
            next(new UserException("Cannot login"));
        }
    }

    @httpGet("/current", authMiddleware)
    public async current(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const id = req.user._id;
            const user = await this.userManager.getUser(id);
            res.json(user.toJSON());
        } catch {
            next(new UserException("Cannot get current user"));
        }
    }

    @httpGet("/:userId", authMiddleware, userHasRole("admin"))
    public async getUser(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const retUser = await this.userManager.getUser(req.params.userId);
            res.json(retUser.toJSON());
        } catch {
            next(new UserException("Cannot get user by id: " + req.params.userId));
        }
    }

    @httpGet("/", authMiddleware)
    public async getUsers(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userManager.getUsers();
            res.json(users.map((user) => user.toJSON()));
        } catch {
            next(new UserException("Cannot get all users"));
        }
    }

    @httpPut("/current", authMiddleware)
    public async editCurrentUser(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const currentUser = await this.userManager.getUser(req.user._id);
            const userEdits = new User(
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                currentUser.password,
                currentUser.roles,
                currentUser.id
            );
            const editedUser = await this.userManager.editUser(userEdits);
            res.json(editedUser);
        } catch {
            next(new UserException("Cannot update current user"));
        }
    }

    @httpPut("/:userId", authMiddleware, userHasRole("admin"))
    public async editUser(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const currentUser = await this.userManager.getUser(req.params.userId);
            const userEdits = new User(
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                currentUser.password,
                currentUser.roles,
                currentUser.id
            );
            const editedUser = await this.userManager.editUser(userEdits);
            res.json(editedUser);
        } catch {
            next(new UserException("Cannot update user: " + req.params.userId));
        }
    }

}
