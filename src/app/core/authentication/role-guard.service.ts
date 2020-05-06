// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { CredentialsService } from '@app/core/authentication/credentials.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public router: Router,
    private credentialsService: CredentialsService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    if (this.credentialsService.isAuthenticated()) {
      var role = this.credentialsService.credentials['data']['role'];
    } else {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    // const token = localStorage.getItem('token');
    // const tokenPayload = JWT(token);
    if (
      !this.credentialsService.isAuthenticated() ||
      !expectedRole.includes(role)
    ) {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
