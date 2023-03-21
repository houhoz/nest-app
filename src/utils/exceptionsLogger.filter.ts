import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('Exception thrown', exception);
    super.catch(exception, host);
  }
}

// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   NotFoundException,
// } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch(NotFoundException)
// export class ExceptionsLoggerFilter implements ExceptionFilter {
//   catch(exception: NotFoundException, host: ArgumentsHost) {
//     const context = host.switchToHttp();
//     const response = context.getResponse<Response>();
//     const request = context.getRequest<Request>();
//     const status = exception.getStatus();
//     const message = exception.getMessage();

//     response.status(status).json({
//       message,
//       statusCode: status,
//       time: new Date().toISOString(),
//     });
//   }
// }
