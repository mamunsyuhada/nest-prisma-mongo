import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalConfig } from './helper/config/global.config';

export interface SuccessResponse<T> {
  statusCode: number;
  data: T;
  appVersion: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<any>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<any>> {
    context.switchToHttp().getResponse().status(200);
    const { appVersion } = GlobalConfig;
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        data,
        appVersion,
      })),
    );
  }
}
