// src/app/auth/role-guard.service.ts
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { CredentialsService } from '@app/core/authentication/credentials.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public router: Router,
    private credentialsService: CredentialsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = route.data.expectedRole;
    if (this.credentialsService.isAuthenticated()) {
      var role = this.credentialsService.getRole();
    } else {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login'], {
        queryParams: { redirect: state.url },
        replaceUrl: true
      });
      return false;
    }
    // const token = localStorage.getItem('token');
    // const tokenPayload = JWT(token);
    if (!expectedRole.includes(role)) {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
