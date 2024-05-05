import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AwardCertificateComponent } from './award-certificate.component';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { extract, AuthenticationGuard } from '@app/core';

const appRoutes: Routes = [
  {
    path: '',
    component: AwardCertificateComponent,
    canActivate: [RoleGuardService, AuthenticationGuard],
    data: { expectedRole: ['player', 'club', 'academy', 'coache'] },
    children: [
      {
        path: '',
        component: AwardCertificateComponent,
        data: { title: extract('Awards & Certificates') }
      },
      {
        path: ':handle',
        component: AwardCertificateComponent,
        data: { title: extract('Awards & Certificates') }
      },
      { path: '**', component: AwardCertificateComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AwardCertificateRoutingModule {}
