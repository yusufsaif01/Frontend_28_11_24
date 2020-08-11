import { Component, OnInit } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { MatTableDataSource } from '@angular/material/table';
import { LinkReportCardTableConfig } from './link-report-card-table-conf';
@Component({
  selector: 'app-link-report-card',
  templateUrl: './link-report-card.component.html',
  styleUrls: ['./link-report-card.component.scss']
})
export class LinkReportCardComponent implements OnInit {
  public tableConfig: LinkReportCardTableConfig = new LinkReportCardTableConfig();
  public dataSource = new MatTableDataSource([
    {
      published_date: '9 Jul 2020',
      createby: 'XYZ Club',
      status: 'Published'
    }
  ]);
  constructor() {}
  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: false,
    view_profile_link: true,
    footplayers: true,
    is_public: false
  };
  ngOnInit() {}
}
