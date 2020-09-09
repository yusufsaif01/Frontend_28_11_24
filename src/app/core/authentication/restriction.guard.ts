import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Logger } from '../logger.service';
import { CredentialsService } from './credentials.service';

const log = new Logger('RestrictionGuard');

@Injectable({
  providedIn: 'root'
})
export class RestrictionGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.credentialsService.isRestricted()) {
      this.router.navigate(['/']);
      return true;
    }

    return true;
  }
}
