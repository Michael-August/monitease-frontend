import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SWEET_ALERT } from 'src/app/shared/utils';

const maxRetries = 2
const delayMs = 2000

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 403) {
          this.authSrv.logout();
          SWEET_ALERT('Session Expired', 'Your session has expired, you will have to log in again', 'info', 'info', 'ok', false, undefined, undefined)
        }
        return throwError(err);
      })
    )
  }
}
