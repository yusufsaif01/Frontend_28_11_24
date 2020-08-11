import { Component, OnInit } from '@angular/core';
import { ManageReportCardService } from './manage-report-card.service';
import { untilDestroyed } from '@app/core';
import { environment } from '@env/environment';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { SharedService } from '@app/shared/shared.service';
import { ManageReportCardTableConfig } from './manage-report-card-table-conf';

@Component({
  selector: 'app-manage-report-card',
  templateUrl: './manage-report-card.component.html',
  styleUrls: ['./manage-report-card.component.scss']
})
export class ManageReportCardComponent implements OnInit {
  tableConfig: ManageReportCardTableConfig = new ManageReportCardTableConfig();
  dataSource = new MatTableDataSource([
    {
      name: 'Jane Cooper',
      category: 'Grassroot',
      published_date: '9 Jul 2020',
      createby: 'XYZ Club',
      number_report_card: '4',
      status: 'Published'
    }
  ]);
  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: false,
    view_profile_link: true,
    footplayers: true,
    is_public: false
  };
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

  constructor(
    private _manageReportCardService: ManageReportCardService,
    private _toastrService: ToastrService,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.getReportCardList();
  }
  openFilter() {
    this._sharedService.setFilterDisplayValue(true);
  }

  getReportCardList() {
    this._manageReportCardService
      .getReportCardList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
          }
          // this.dataSource = new MatTableDataSource(response.data.records);
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  ngOnDestroy() {}
}
