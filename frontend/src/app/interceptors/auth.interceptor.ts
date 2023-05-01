import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserSelectors } from '../state/user/user.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.store.selectSnapshot(UserSelectors.token);
    if (token && request.withCredentials) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${token}`,
          ['X-Requested-With']: 'XMLHttpRequest',
          ['Content-type']: 'application/json',
        },
      });
    }
    return next.handle(request);
  }
}
