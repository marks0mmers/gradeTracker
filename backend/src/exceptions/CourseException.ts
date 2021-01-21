import { HttpException } from "./HttpException";

export class CourseException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}
