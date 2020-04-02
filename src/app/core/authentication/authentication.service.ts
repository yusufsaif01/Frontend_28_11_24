import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

const routes = {
  login: (c: LoginContext) => `/login`,
  logout: () => `/logout`,
  register: (c: RegisterContext) => '/register',
  resetPassword: (c: ResetPasswordContext) => '/reset-password',
  changePasssword: (c: ChangePasswordContext) => '/change-password',
  forgetPassword: (c: ForgotPasswordContext) => '/forgot-password',
  createPassword: (c: ResetPasswordContext) => '/create-password',
  getProfileDetails: () => '/profile'
};

export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}
export interface RegisterContext {
  email: string;
  phone: string;
  country: string;
  state: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  member_type?: string;
}
export interface ForgotPasswordContext {
  email: string;
}

export interface ResetPasswordContext {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordContext {
  old_password: string;
  new_password: string;
  confirm_password: string;
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

  register(context: RegisterContext): Observable<any> {
    return this.httpClient.post(routes.register(context), context);
  }

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

  resetPassword(context: ResetPasswordContext, token: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.post(
      routes.resetPassword(context),
      context,
      httpOptions
    );
  }

  createPassword(
    context: ResetPasswordContext,
    token: string
  ): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.post(
      routes.createPassword(context),
      context,
      httpOptions
    );
  }

  changePassword(context: ChangePasswordContext): Observable<any> {
    return this.httpClient.post(routes.changePasssword(context), context);
  }

  forgetPassword(context: ForgotPasswordContext): Observable<any> {
    return this.httpClient.post(routes.forgetPassword(context), context);
  }

  getProfileDetails(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE4YTFmMzk2LTI4MTgtNDNmNC04OGJhLTgwZWQxZjI2OWZhMSIsImVtYWlsIjoiY2x1YkBjbHViLmNvbSIsImlhdCI6MTU4NTgxMTMyNywiZXhwIjoxNTg1ODE0OTI3fQ.P0g7IrqQDKIsBXfK85pitiBVWG9eEU7TCp0etMfL0T8' // To be made dynamic
      })
    };
    return this.httpClient.get(routes.getProfileDetails(), httpOptions);
  }
}
