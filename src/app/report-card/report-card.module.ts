import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { ReportCardComponent } from './report-card.component';
import { ManageReportCardComponent } from './manage-report-card/manage-report-card.component';
import { AddEditReportCardComponent } from './add-edit-report-card/add-edit-report-card.component';
import { ViewReportCardComponent } from './view-report-card/view-report-card.component';
import { ReportCardRoutingModule } from './report-card-routing.module';
import { LinkReportCardComponent } from './link-report-card/link-report-card.component';
import { AdsenseModule } from 'ng2-adsense';
@NgModule({
  declarations: [
    ReportCardComponent,
    ManageReportCardComponent,
    AddEditReportCardComponent,
    ViewReportCardComponent,
    LinkReportCardComponent
  ],
  imports: [
    CommonModule,
    ReportCardRoutingModule,
    SharedModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8133526594590676'
    })
  ]
})
export class ReportCardModule {}
