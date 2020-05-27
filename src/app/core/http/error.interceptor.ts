import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CredentialsService } from '../authentication/credentials.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private credentialService: CredentialsService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 || err.status === 402) {
          if (this.credentialService.isAuthenticated()) {
            this.authenticationService.logout();
            this.router.navigate(['/login'], {
              queryParams: { redirect: this.router.routerState.snapshot.url },
              replaceUrl: true
            });
          } else {
            this.router.navigate(['/login'], {
              queryParams: { redirect: this.router.routerState.snapshot.url },
              replaceUrl: true
            });
            localStorage.clear();
            sessionStorage.clear();
          }
        }
        const error = err;
        return throwError(error);
      })
    );
  }
}
