import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract, AuthenticationGuard } from '@app/core';
import { ManageReportCardComponent } from './manage-report-card/manage-report-card.component';
import { ReportCardComponent } from './report-card.component';
import { RoleGuardService } from '@app/core/authentication/role-guard.service';
import { AddEditReportCardComponent } from './add-edit-report-card/add-edit-report-card.component';
import { LinkReportCardComponent } from './link-report-card/link-report-card.component';

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
        data: { title: extract('Manage report card') }
      },
      {
        path: 'edit-report-card/:send_to/:report_card_id',
        component: AddEditReportCardComponent,
        data: { title: extract('Add report card') }
      },
      {
        path: 'add-report-card/:send_to',
        component: AddEditReportCardComponent,
        data: { title: extract('Add report card') }
      },
      {
        path: 'link-report-card',
        component: LinkReportCardComponent,
        data: { title: extract('Link report card') }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportCardRoutingModule {}
