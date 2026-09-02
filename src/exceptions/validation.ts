import { ErrorCode, HttpException } from "./root.js";

export class UnprocessableEntity extends HttpException {
    constructor(error: ErrorCode | null, message:string, errorCode:ErrorCode) {
        super(message, errorCode, 422, error)
    }
}
