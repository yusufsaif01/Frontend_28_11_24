import { Component, OnInit, OnDestroy } from '@angular/core';
import { FootPlayerTableConfig } from './foot-player-table-conf';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { environment } from '@env/environment';
import { FootPlayerService } from './foot-player.service';
import { untilDestroyed } from '@app/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { AddFootplayerComponent } from './add-footplayer/add-footplayer.component';
import { StatusConfirmationComponent } from '@app/shared/dialog-box/status-confirmation/status-confirmation.component';

@Component({
  selector: 'app-foot-player',
  templateUrl: './foot-player.component.html',
  styleUrls: ['./foot-player.component.scss']
})
export class FootPlayerComponent implements OnInit, OnDestroy {
  // TABLE CONFIG
  public tableConfig: FootPlayerTableConfig = new FootPlayerTableConfig();
  public dataSource = new MatTableDataSource([]);
  filter: any = {};
  pageSize: number = 10;
  pageNo: number = 1;
  selectedPage: number = 1;
  environment = environment;
  player_type: string;
  member_type: string;
  show_count: number;
  total_count: number;

  // LEFT PANEL
  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    is_public: false
  };
  isPublic: boolean = false;
  userId: string;
  filtersList = {
    position: true,
    playerCategory: true,
    age: true,
    location: true,
    strongFoot: true,
    teamTypes: true,
    ability: true,
    status: true
  };

  constructor(
    private _footPlayerService: FootPlayerService,
    public dialog: MatDialog,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.filter.page_size = this.pageSize;
    this.filter.page_no = this.pageNo;
    this.getFootPlayerList();
  }

  ngOnDestroy() {}

  getMemberType(value: string) {
    this.member_type = value;
  }

  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.pageNo = this.selectedPage;
    this.filter.page_no = this.pageNo;
    this.getFootPlayerList();
  }

  getFootPlayerList(search?: string) {
    this.filter.search = search;
    this._footPlayerService
      .getFootPlayerList(this.filter)
      // .pipe(untilDestroyed(this))
      .subscribe(response => {
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
        }
        this.dataSource = new MatTableDataSource(response.data.records);
        this.show_count = response.data.records.length;
        this.total_count = response.data.total;
      });
  }
  getSearchText(value: string) {
    let filterValue = value;
    this.filter.page_no = 1;
    this.selectedPage = 1;
    this.getFootPlayerList(filterValue);
  }

  // AddPlayerPopUp
  onaddfootplayer(): void {
    let data = {
      member_type: this.member_type
    };
    const dialogRef = this.dialog.open(AddFootplayerComponent, {
      width: '99%',
      data: {
        ...data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.selectedPage = 1;
        this.filter.page_no = 1;
        this.getFootPlayerList();
      }
    });
  }
  // delete
  deletePopup(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '40% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Please confirm',
        message: 'Are you sure you want to delete?',
        acceptText: 'Yes',
        rejectText: 'No'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._footPlayerService
          .deleteFootPlayer(id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                `Success`,
                'FootPlayer deleted successfully'
              );
              this.selectedPage = 1;
              this.filter.page_no = 1;
              this.getFootPlayerList();
            },
            error => {
              // log.debug(`Login error: ${error}`);

              this._toastrService.error(
                `${error.error.message}`,
                'Delete Footplayer'
              );
            }
          );
      }
    });
  }

  resendInvitationPopup(email: string) {
    const dialogRef = this.dialog.open(StatusConfirmationComponent, {
      width: '40% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Please confirm',
        message: 'Do you want to Resend Invitation?',
        acceptText: 'Yes',
        rejectText: 'No'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._footPlayerService
          .resendFootPlayerInvite({ email })
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                `Success`,
                'Resend invite successfully'
              );
            },
            error => {
              this._toastrService.error(
                `${error.error.message}`,
                'Resend Invitation'
              );
            }
          );
      }
    });
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
    this.getFootPlayerList();
  }
}
