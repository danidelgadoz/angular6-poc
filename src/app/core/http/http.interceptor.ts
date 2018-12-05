import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError, finalize, timeout } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  started: number;
  urlPath: string;

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = `${environment.backend.host}/${req.url}`;

    const headers: HttpHeaders = req.headers;
    // headers = ss ? headers.set('Authorization', ss) : headers;

    const authReq = req.clone({ url: url, headers: headers });

    return next
    .handle(authReq)
    .pipe(
      timeout(30000),
      map((res) => this.handleSuccessfulResponse(res)),
      catchError((err) => this.handleErrorResponse(err)),
      finalize(this.handleRequestCompleted.bind(this))
    );
  }

  private handleSuccessfulResponse(event): HttpResponse<any> {
    // console.log('response at interceptor', event);

    if (event instanceof HttpResponse) {
      event = event.clone({ body: event.body.response });
    }
    return event;
  }

  private handleErrorResponse(errorResponse): Observable<HttpEvent<any>> {
    // console.log('error at interceptor', errorResponse);

    if (errorResponse instanceof TimeoutError) {
      return throwError('Timeout Exception');
    }

    switch (errorResponse.status) {
      case 401: // Unauthorized
        break;
      case 503: // Service Unavailable
        break;
      case 503: // Internal Server Error
        break;
      default: // Other Error
    }

    return throwError(errorResponse);
  }

  private handleRequestCompleted(): void {
    // console.log(`Request finished`);
  }
}
