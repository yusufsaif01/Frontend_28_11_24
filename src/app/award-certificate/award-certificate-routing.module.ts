import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AwardCertificateComponent } from './award-certificate.component';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { extract } from '@app/core';

const appRoutes: Routes = [
  {
    path: '',
    component: AwardCertificateComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: ['player', 'club', 'academy'] },
    children: [
      {
        path: '',
        component: AwardCertificateComponent,
        data: { title: extract('Awards and Certification') }
      },
      {
        path: ':handle',
        component: AwardCertificateComponent,
        data: { title: extract('Awards and Certification') }
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
