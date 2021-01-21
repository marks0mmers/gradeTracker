import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { RequestWithUser } from "../auth/Auth";
import { authMiddleware } from "../auth/auth.middleware";
import TYPES from "../config/types";
import { ViewRequestException } from "../exceptions/ViewRequestException";
import { ViewRequestManager } from "./view-request.manager";

@controller("/viewRequests", authMiddleware)
export class ViewRequestController {

    @inject(TYPES.ViewRequestManager)
    private viewRequestManager: ViewRequestManager;

    @httpGet("/forMeToRespond")
    public async getAllForReceiver(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const requests = await this.viewRequestManager.getAllForReceiver(req.user._id.toString());
            res.json(requests);
        } catch (err) {
            if (err) {
                next(err);
            } else {
                next(new ViewRequestException("Problem getting view requests"));
            }
        }
    }

    @httpGet("/sent")
    public async getAllForRequester(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const requests = await this.viewRequestManager.getAllForRequester(req.user._id.toString());
            res.json(requests);
        } catch (err) {
            if (err) {
                next(err);
            } else {
                next(new ViewRequestException("Problem getting view requests"));
            }
        }
    }

    @httpPost("/send/user/:userId")
    public async createRequest(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const request = await this.viewRequestManager.sendUserViewRequest(req.user._id.toString(), req.params.userId);
            res.json(request);
        } catch (err) {
            if (err) {
                next(err);
            } else {
                next(new ViewRequestException("Problem getting view requests"));
            }
        }
    }

    @httpPost("/approve/:id")
    public async approveRequest(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const request = await this.viewRequestManager.approveViewRequest(req.params.id, req.user._id.toString());
            res.json(request);
        } catch (err) {
            if (err) {
                next(err);
            } else {
                next(new ViewRequestException("Problem getting view requests"));
            }
        }
    }

    @httpPost("/deny/:id")
    public async denyRequest(req: RequestWithUser & Request, res: Response, next: NextFunction) {
        try {
            const request = await this.viewRequestManager.denyViewRequest(req.params.id, req.user._id.toString());
            res.json(request);
        } catch (err) {
            if (err) {
                next(err);
            } else {
                next(new ViewRequestException("Problem getting view requests"));
            }
        }
    }

}
