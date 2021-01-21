import { HttpException } from "./HttpException";

export class ViewRequestException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}
