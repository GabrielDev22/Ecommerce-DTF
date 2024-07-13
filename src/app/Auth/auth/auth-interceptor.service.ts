import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService : AuthService) { }
  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this._authService.refreshToken().pipe(
            switchMap((response: any) => {
              localStorage.setItem('jwt', response.jwt);
              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.jwt}`
                }
              });
              return next.handle(clonedRequest);
            }),
            catchError((err) => {
              this._authService.logout().subscribe();
              return throwError(() => new Error(err.message));
            })
          );
        } else {
          return throwError(() => new Error(error.message));
        }
      })
    );
  }
  
}


