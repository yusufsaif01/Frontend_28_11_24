// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public router: Router,
    private credentialsService: CredentialsService,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data.expectedRole;
    if (!this.credentialsService.isAuthenticated()) {
      this.authenticationService.logout();
      return false;
    }
    let role = this.credentialsService.getRole();
    if (!expectedRole.includes(role)) {
      //  this.authenticationService.logout();
      return false;
    }
    return true;
  }
}
