import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalConfig } from './helper/config/global.config';

export interface OkResponse<T> {
  appVersion: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, OkResponse<any>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<OkResponse<any>> {
    context.switchToHttp().getResponse().status(200);
    const { appVersion } = GlobalConfig;
    return next.handle().pipe(
      map((data) => ({
        status: context.switchToHttp().getResponse().statusCode,
        data: data,
        appVersion,
      })),
    );
  }
}
