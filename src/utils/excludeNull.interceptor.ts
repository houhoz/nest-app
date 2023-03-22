import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';
import recursivelyStripNullValues from './recursivelyStripNullValues';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value: any) => {
        return {
          data: recursivelyStripNullValues(classToPlain(value)),
          code: 200,
          message: '请求成功',
        };
      }),
    );
  }
}
