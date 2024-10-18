import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingCenterTableConfig } from './traning-center-table-conf';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { environment } from '@env/environment';
import { TraningCenterService } from './traning-center.service';
import { untilDestroyed } from '@app/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { AddCenterComponent } from './add-center/add-center.component';
//import { AddFootplayerComponent } from '../manage-footplayer/foot-player/add-footplayer/add-footplayer.component';
import { StatusConfirmationComponent } from '@app/shared/dialog-box/status-confirmation/status-confirmation.component';
import { SharedService } from '@app/shared/shared.service';
declare let gtag: Function;
@Component({
  selector: 'app-traning-center',
  templateUrl: './traning-center.component.html',
  styleUrls: ['./traning-center.component.scss']
})
export class TraningCenterComponent implements OnInit, OnDestroy {
  public tableConfig: TrainingCenterTableConfig = new TrainingCenterTableConfig();
  public dataSource = new MatTableDataSource([]);
  sidebar: boolean = false;
  filter: any = {};
  pageSize: number = 10;
  pageNo: number = 1;
  selectedPage: number = 1;
  environment = environment;
  player_type: string;
  member_type: string;
  show_count: number;
  total_count: number;
  searchText = '';

  userId: string;
  // LEFT PANEL
  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    is_public: false
  };
  isPublic: boolean = false;

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
    private _footPlayerService: TraningCenterService,
    public dialog: MatDialog,
    private _toastrService: ToastrService,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.filter.page_size = this.pageSize;
    this.filter.page_no = this.pageNo;
    this.getTraningCenterList(this.userId, this.pageSize, 1);
  }

  ngOnDestroy() {}

  openFilter() {
    this._sharedService.setFilterDisplayValue(true);
  }
  addFootplayerButtonClick() {
    gtag('event', 'add_footplayer_button_click', {
      event_category: 'Button',
      event_label: 'Add Footplayer Button',
      value: 1
    });
  }
  getMemberType(value: string) {
    this.member_type = value;
  }

  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.pageNo = this.selectedPage;
    this.filter.page_no = this.pageNo;
    this.getTraningCenterList(this.userId, this.pageSize, event.selectedPage);
  }

  getTraningCenterList(userid: string, page_size: number, page_no: number) {
    this._footPlayerService
      .traningCenterList(userid, { page_size, page_no })
      // .pipe(untilDestroyed(this))
      .subscribe(response => {
        console.log('response in api hits');
        const od = response.data.records.map(item => item.opening_days);

        this.dataSource = new MatTableDataSource(response.data.records);
        this.show_count = response.data.records.length;
        this.total_count = response.data.total;
      });
  }
  getSearchText(value: string) {
    this.searchText = value;
    this.filter.search = this.searchText;
    this.filter.page_no = 1;
    this.selectedPage = 1;
    this.getTraningCenterList(this.userId, this.pageSize, 1);
  }

  // AddPlayerPopUp
  onAddFootPlayer(): void {
    let data = {
      member_type: this.member_type
    };
    this.addFootplayerButtonClick();
    const dialogRef = this.dialog.open(AddCenterComponent, {
      // width: '99%',
      panelClass: 'addfootplayer',
      data: {
        ...data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.selectedPage = 1;
        this.filter.page_no = 1;
        this.getTraningCenterList(this.userId, this.pageSize, 1);
      }
    });
  }
  // delete
  deletePopup(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'deletepopup',
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
          .deleteTraningCenter(id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                `Success`,
                'Training Center deleted successfully'
              );
              this.selectedPage = 1;
              this.filter.page_no = 1;
              this.getTraningCenterList(this.userId, this.pageSize, 1);
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
      panelClass: 'statusconfirmation',
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
    this.getTraningCenterList(this.userId, this.pageSize, 1);
  }
}
