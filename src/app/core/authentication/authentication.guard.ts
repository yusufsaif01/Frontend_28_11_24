import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Logger } from '../logger.service';
import { CredentialsService } from './credentials.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.credentialsService.isAuthenticated()) {
      return true;
    }

    if (
      !this.credentialsService.isAuthenticated() &&
      state.url.indexOf('gallery-view') !== -1
    ) {
      this.router.navigate(['/home']);
      return true;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');

    if (state.url.indexOf('login') !== 0) {
      this.router.navigate(['/login'], {
        queryParams: { redirect: state.url },
        replaceUrl: true
      });
    }
    localStorage.clear();
    return false;
  }
}
