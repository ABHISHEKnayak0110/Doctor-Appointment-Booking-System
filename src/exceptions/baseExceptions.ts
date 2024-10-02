export class BaseException implements Error {
    name: string;
    message: string;
    operation: string;
    errorCode: string;
    statusCode: number;
    source: string;
    constructor({
        message,
        operation,
        errorCode,
        statusCode,
        source
    }: {
        message: string;
        operation: string;
        errorCode: string;
        statusCode: number;
        source: string;
    }) {
        this.message = message;
        this.operation = operation;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.source = source
    }
}
