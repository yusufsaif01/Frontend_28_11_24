// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { CredentialsService } from '@app/core/authentication/credentials.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public router: Router,
    private credentialsService: CredentialsService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const role = this.credentialsService.credentials['data']['role'];
    // const token = localStorage.getItem('token');
    // const tokenPayload = JWT(token);
    if (
      !this.credentialsService.isAuthenticated() ||
      !expectedRole.includes(role)
    ) {
      this.router.navigate(['/404']);
      return false;
    }
    return true;
  }
}
