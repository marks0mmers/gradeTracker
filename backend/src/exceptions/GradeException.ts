import { HttpException } from "./HttpException";

export class GradeException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}
