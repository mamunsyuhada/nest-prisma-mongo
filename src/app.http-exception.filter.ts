import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { GlobalConfig } from './helper/config/global.config';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: HttpException;
  appVersion: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // private readonly logger = new Logger(HttpExceptionFilter.name);
  constructor(private readonly config: ConfigService) {
    this.config = config;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorResponse: any = {};
    const internalError = {
      code: httpStatus,
      message: 'Internal server error',
    };
    if (this.config.get<string>('NODE_ENV') === 'prod' && httpStatus == 500) {
      errorResponse = internalError;
    } else {
      errorResponse = !(exception instanceof HttpException)
        ? internalError
        : exception['response'];
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { appVersion } = GlobalConfig;
    delete errorResponse['error'];
    return response.status(httpStatus).json({
      ...errorResponse,
      appVersion,
    });
  }
}
