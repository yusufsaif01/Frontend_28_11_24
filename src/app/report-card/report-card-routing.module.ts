import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract, AuthenticationGuard } from '@app/core';
import { ManageReportCardComponent } from './manage-report-card/manage-report-card.component';
import { ReportCardComponent } from './report-card.component';
import { RoleGuardService } from '@app/core/authentication/role-guard.service';
import { AddEditReportCardComponent } from './add-edit-report-card/add-edit-report-card.component';
import { ViewReportCardComponent } from './view-report-card/view-report-card.component';
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
        data: { title: extract('Edit report card') }
      },
      {
        path: 'add-report-card/:send_to',
        component: AddEditReportCardComponent,
        data: { title: extract('Add report card') }
      },
      {
        path: 'view-report-card/:report_card_id',
        component: ViewReportCardComponent,
        data: { title: extract('View report card') }
      },
      {
        path: 'view-report-card/:player_id/:report_card_id',
        component: ViewReportCardComponent,
        data: { title: extract('View report card') }
      },
      {
        path: 'link-report-card/:player_id',
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
