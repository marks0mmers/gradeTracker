import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { DataStoredInToken, getTokenFromHeaders, RequestWithUser } from "../auth/Auth";
import { WrongAuthentificationTokenException } from "../exceptions/WrongAuthenticationToken";
import { userDatabase } from "../user/user.schema";

export const authMiddleware = async (request: RequestWithUser & Request, response: Response, next: NextFunction) => {
    const auth = getTokenFromHeaders(request);
    if (auth) {
        const secret = process.env.JWT_SECRET || "secret";
        try {
            const verificationResponse = verify(auth, secret) as DataStoredInToken;
            const id = verificationResponse.id;
            const user = await userDatabase.findById(id);
            if (user) {
                request.user = user;
                request.user._id = request.user._id.toString();
                next();
            } else {
                next(new WrongAuthentificationTokenException());
            }
        } catch (error) {
            next(new WrongAuthentificationTokenException());
        }
    } else {
        next(new WrongAuthentificationTokenException());
    }
  };
