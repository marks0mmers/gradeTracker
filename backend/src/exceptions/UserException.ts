import { HttpException } from "./HttpException";

export class UserException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}
