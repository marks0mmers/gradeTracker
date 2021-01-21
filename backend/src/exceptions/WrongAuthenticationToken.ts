import { HttpException } from "./HttpException";

export class WrongAuthentificationTokenException extends HttpException {
    constructor() {
        super(401, "Wrong Authentification Token");
    }
}
