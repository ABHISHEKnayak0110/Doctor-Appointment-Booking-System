import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log("exception", exception)
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        const status = exception['statusCode'] || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception.message
            ? exception.message
            : 'Internal server error';


        let errorResponse: any = {
            message: message,
            operation: exception['operation'],
            errorCode: exception['errorCode'],
            statusCode: exception['statusCode'] || status,
            source: exception['source']
        }
        if (exception instanceof BadRequestException) {
            const response = exception.getResponse();
          
            if (response && typeof response === 'object') {
                errorResponse = this.makeErrorObject(response)
            }
        }

        response.status(status).json(errorResponse);
    }



    makeErrorObject(errorResponse) {
        return {
            message: errorResponse?.message,
            errorCode: "VALIDATION-001",
            statusCode: errorResponse['statusCode'] || 500,
        }
    }
}
