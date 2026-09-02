// message, statusCode, erroCode, error message

export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    constructor(message:string, errorCode: any, statusCode:number, errors:ErrorCode) {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors =  errors
    }
}

export enum ErrorCode {
    USER_NOT_FOUND = 404,
    USER_ALREADY_EXIST = 401,
    INCORRECT_PASSWORD = 401,
}