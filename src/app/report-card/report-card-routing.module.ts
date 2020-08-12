import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract, AuthenticationGuard } from '@app/core';
import { ManageReportCardComponent } from './manage-report-card/manage-report-card.component';
import { ReportCardComponent } from './report-card.component';
import { RoleGuardService } from '@app/core/authentication/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ReportCardComponent,
    canActivate: [RoleGuardService, AuthenticationGuard],
    data: { expectedRole: ['player', 'club', 'academy'] },
    children: [
      {
        path: '',
        component: ManageReportCardComponent,
        data: { title: extract('Manage Report Card') }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportCardRoutingModule {}
