import { Component, OnInit } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '@app/shared/shared.service';
import { ManageReportCardTableConfig } from './manage-report-card-table-conf';

@Component({
  selector: 'app-manage-report-card',
  templateUrl: './manage-report-card.component.html',
  styleUrls: ['./manage-report-card.component.scss']
})
export class ManageReportCardComponent implements OnInit {
  public tableConfig: ManageReportCardTableConfig = new ManageReportCardTableConfig();
  public dataSource = new MatTableDataSource([
    {
      name: 'Jane Cooper',
      category: 'Grassroot',
      published_date: '9 Jul 2020',
      createby: 'XYZ Club',
      number_report_card: '4',
      status: 'Published'
    }
  ]);
  constructor(private _sharedService: SharedService) {}

  filtersList = {
    position: false,
    playerCategory: true,
    age: false,
    location: false,
    strongFoot: false,
    teamTypes: false,
    ability: false,
    status: true,
    daterange: true
  };

  openFilter() {
    this._sharedService.setFilterDisplayValue(true);
  }

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
