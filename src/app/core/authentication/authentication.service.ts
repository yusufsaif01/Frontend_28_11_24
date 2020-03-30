import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

const routes = {
  login: (c: LoginContext) => `/login`,
  logout: () => `/logout`
};

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private credentialsService: CredentialsService,
    private httpClient: HttpClient
  ) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    // Replace by proper authentication call
    return this.httpClient.post(routes.login(context), context);
    // .pipe(
    //   map((body: any) => body.value),
    //   catchError(err => throwError(new Error(err.message)))
    // );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    let credentials: any = {};
    if (localStorage.getItem('credentials')) {
      credentials = JSON.parse(localStorage.getItem('credentials'));
    } else {
      credentials = JSON.parse(sessionStorage.getItem('credentials'));
    }
    this.httpClient.post(routes.logout(), credentials.data.token);
    this.credentialsService.setCredentials();
    return of(true);
  }
}
