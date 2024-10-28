import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManagecoacheTableConfig } from './manage-coache-table-conf';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { environment } from '@env/environment';
import { ManagecoacheService } from './manage-coache.service';
import { untilDestroyed } from '@app/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { AddcoacheComponent } from './add-coache/add-coache.component';
//import { AddFootplayerComponent } from '../manage-footplayer/foot-player/add-footplayer/add-footplayer.component';
import { StatusConfirmationComponent } from '@app/shared/dialog-box/status-confirmation/status-confirmation.component';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'app-manage-coache',
  templateUrl: './manage-coache.component.html',
  styleUrls: ['./manage-coache.component.scss']
})
export class ManagecoacheComponent implements OnInit, OnDestroy {
  public tableConfig: ManagecoacheTableConfig = new ManagecoacheTableConfig();
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
    private _footPlayerService: ManagecoacheService,
    public dialog: MatDialog,
    private _toastrService: ToastrService,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.filter.page_size = this.pageSize;
    this.filter.page_no = this.pageNo;
    this.getFootPlayerList();
  }

  ngOnDestroy() {}

  openFilter() {
    this._sharedService.setFilterDisplayValue(true);
  }

  getMemberType(value: string) {
    this.member_type = value;
  }

  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.pageNo = this.selectedPage;
    this.filter.page_no = this.pageNo;
    this.getFootPlayerList();
  }

  getFootPlayerList() {
    this._footPlayerService
      .getFootPlayerList(this.filter)
      // .pipe(untilDestroyed(this))
      .subscribe(response => {
        let records = response.data.records;
        console.log('recoed is=>', records);
        for (let i = 0; i < records.length; i++) {
          records[i]['avatar'] = '';
        }
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
    this.getFootPlayerList();
  }

  // AddPlayerPopUp
  onAddFootPlayer(): void {
    let data = {
      member_type: this.member_type
    };
    const dialogRef = this.dialog.open(AddcoacheComponent, {
      // width: '99%',
      panelClass: 'addfootplayer',
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
          .deleteFootCoach(id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                `Success`,
                'coache deleted successfully'
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
    this.getFootPlayerList();
  }
}
