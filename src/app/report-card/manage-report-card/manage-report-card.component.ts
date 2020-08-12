import { Component, OnInit } from '@angular/core';
import {
  ManageReportCardService,
  GetReportCardListResponseContext,
  GetReportCardListContext
} from './manage-report-card.service';
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
  dataSource = new MatTableDataSource([]);
  filter: GetReportCardListContext = {};
  pageSize = 10;
  pageNo = 1;
  selectedPage = 1;
  show_count = 0;
  total_count = 0;
  searchText = '';
  isPublic = false;

  // panelOptions: Partial<PanelOptions> = {
  //   bio: true,
  //   member_type: true,
  //   my_achievements: false,
  //   view_profile_link: true,
  //   footplayers: true,
  //   is_public: false
  // };
  filtersList = {
    // position: false,
    playerCategory: true,
    // age: false,
    // location: false,
    // strongFoot: false,
    // teamTypes: false,
    // ability: false,
    status: true,
    dateRange: true
  };

  constructor(
    private _manageReportCardService: ManageReportCardService,
    private _toastrService: ToastrService,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.filter.page_size = this.pageSize;
    this.filter.page_no = this.pageNo;
    this.getReportCardList();
  }

  openFilter() {
    this._sharedService.setFilterDisplayValue(true);
  }

  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.pageNo = this.selectedPage;
    this.filter.page_no = this.pageNo;
    this.getReportCardList();
  }

  getSearchText(value: string) {
    this.searchText = value;
    this.filter.search = this.searchText;
    this.filter.page_no = 1;
    this.selectedPage = 1;
    this.getReportCardList();
  }

  onChangeFilter(event: any) {
    if (event) {
      this.filter = event;
    } else {
      this.filter = {};
    }
    this.selectedPage = 1;
    this.filter.page_no = 1;
    this.filter.page_size = 10;
    this.getReportCardList();
  }

  getReportCardList() {
    if (this.filter.hasOwnProperty('footplayer_category')) {
      Object.defineProperty(
        this.filter,
        'player_category',
        Object.getOwnPropertyDescriptor(this.filter, 'footplayer_category')
      );
      delete this.filter['footplayer_category'];
    }
    this._manageReportCardService
      .getReportCardList(this.filter)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
          }
          let modifiedResponse = this.prepareCardResponse(records);
          this.dataSource = new MatTableDataSource(modifiedResponse);
          this.show_count = response.data.records.length;
          this.total_count = response.data.total;
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  prepareCardResponse(
    records: GetReportCardListResponseContext['data']['records']
  ) {
    records.forEach(record => {
      if (record.total_report_cards <= 1) {
        record['no_of_report_cards'] = {
          total_report_cards: record.total_report_cards
        };
      } else {
        record['no_of_report_cards'] = {
          total_report_cards: record.total_report_cards,
          url: environment.mediaUrl + '/' + record.user_id
        };
      }
    });
    return records;
  }

  ngOnDestroy() {}
}
