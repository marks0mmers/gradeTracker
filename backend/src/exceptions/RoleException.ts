import { HttpException } from "./HttpException";

export class RoleException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}
