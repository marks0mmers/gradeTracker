import { HttpException } from "./HttpException";

export class GradeCategoryException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}
