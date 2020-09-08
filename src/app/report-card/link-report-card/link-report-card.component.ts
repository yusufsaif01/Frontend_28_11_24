import { Component, OnInit, OnDestroy } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { MatTableDataSource } from '@angular/material/table';
import { LinkReportCardTableConfig } from './link-report-card-table-conf';
import { untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkReportCardService } from './link-report-card.service';
@Component({
  selector: 'app-link-report-card',
  templateUrl: './link-report-card.component.html',
  styleUrls: ['./link-report-card.component.scss']
})
export class LinkReportCardComponent implements OnInit, OnDestroy {
  tableConfig: LinkReportCardTableConfig = new LinkReportCardTableConfig();
  dataSource = new MatTableDataSource([]);
  sidebar: boolean = false;
  playerName = '';
  player_id = '';
  draft_id = '';
  pageSize = 10;
  pageNo = 1;
  selectedPage = 1;
  show_count = 0;
  total_count = 0;
  isPublic = false;

  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: false,
    view_profile_link: true,
    footplayers: true,
    is_public: false
  };

  constructor(
    private _linkReportCardService: LinkReportCardService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe(param => {
      if (param.player_id) {
        this.player_id = param.player_id;
        this.getPlayerReportCardList();
      }
    });
  }

  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.pageNo = this.selectedPage;
    this.getPlayerReportCardList();
  }

  getPlayerReportCardList() {
    this._linkReportCardService
      .getPlayerReportCardList({
        page_size: this.pageSize,
        page_no: this.pageNo,
        player_id: this.player_id
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          this.playerName = response.data.player_name;
          this.draft_id = response.data.draft_id;
          this.dataSource = new MatTableDataSource(records);
          this.show_count = response.data.records.length;
          this.total_count = response.data.total;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  ngOnDestroy() {}
}
