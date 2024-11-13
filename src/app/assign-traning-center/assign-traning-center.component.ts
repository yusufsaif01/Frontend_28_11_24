import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignTraningCenterTableConfig } from './assign-traning-center-table-conf';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { environment } from '@env/environment';
import {
  AssignTraningCenterService,
  GetPublicProfileDetailsResponseContext
} from './assign-traning-center.service';
import { untilDestroyed } from '@app/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';

//import { AddFootplayerComponent } from '../manage-footplayer/foot-player/add-footplayer/add-footplayer.component';
import { StatusConfirmationComponent } from '@app/shared/dialog-box/status-confirmation/status-confirmation.component';
import { SharedService } from '@app/shared/shared.service';
declare let gtag: Function;
export interface PeriodicElement {
  center_name?: string;
  start_time?: number;
  end_time?: number;
  coache_name?: number;
  opening_days?: string;
  status?: string;
}

@Component({
  selector: 'app-assign-traning-center',
  templateUrl: './assign-traning-center.component.html',
  styleUrls: ['./assign-traning-center.component.scss']
})
export class AssignTraningCenterComponent implements OnInit {
  public tableConfig: AssignTraningCenterTableConfig = new AssignTraningCenterTableConfig();
  // public dataSource = new MatTableDataSource([]);
  public dataSource = new MatTableDataSource<any>([]);
  publicProfileData: GetPublicProfileDetailsResponseContext['data'];
  selectedRows: any[] = [];
  sidebar: boolean = false;
  filter: any = {};
  tab = 'personal';
  pageSize: number = 10;
  data: any;
  pageNo: number = 1;
  selectedPage: number = 1;
  environment = environment;
  player_type: string;
  member_type: string;
  show_count: number;
  total_count: number;
  send_to = '';
  searchText = '';
  selection = new SelectionModel<PeriodicElement>(true, []);
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  list = [];
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
    private _footPlayerService: AssignTraningCenterService,
    public dialog: MatDialog,
    private _toastrService: ToastrService,
    private _sharedService: SharedService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    this.filter.page_size = this.pageSize;
    this.filter.page_no = this.pageNo;
    this.getTraningCenterList(this.userId, this.pageSize, 1);
    this.initializeSelection();

    this._activatedRoute.params.subscribe(param => {
      if (param.send_to) {
        this.send_to = param.send_to;
        console.log('player id is', this.send_to);
        this.getPublicProfileDetails();
      }
    });
  }
  initializeSelection() {
    this.dataSource.data = this.dataSource.data.map(row => ({
      ...row,
      selected: false // Set selected to false initially
    }));
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
  // Method to track selection state of each row
  onCheckboxChange(row: any) {
    console.log('changeeeeeee', row);
    row.selected == !row.selected; // Toggle selection state
    console.log(
      'datasource is',
      this.dataSource.data.filter(data => data.id === row)
    );
    this.dataSource.data.forEach(data => {
      if (data.id === row) {
        if (!this.selectedRows.some(existingItem => existingItem.id === row)) {
          this.selectedRows.push(data);
        }
      }
    });
  }

  // Method to retrieve all selected rows
  getSelectedRows() {
    console.log('selected rows', this.selectedRows);
    return this.selectedRows;
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
        console.log('TraningCenterList api hits', response.data.records);
        const od = response.data.records.map(item => item.opening_days);
        // Add `checked: false` to each object
        response.data.records = response.data.records.map(item => ({
          ...item,
          checked: false
        }));

        this.dataSource = new MatTableDataSource(response.data.records);

        this.show_count = response.data.records.length;
        this.total_count = response.data.total;
      });
  }

  getPublicProfileDetails() {
    let data = { user_id: '' };
    data.user_id = this.send_to;
    console.log('user id in getPublicProfileDetails==>', data.user_id);
    this._footPlayerService
      .getPublicProfileDetails(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.publicProfileData = response.data;
          console.log(
            'public profile data front =====>',
            this.publicProfileData
          );

          console.log(response.data);
          // this.setAvatar();
          // this.is_following = this.publicProfileData.is_followed;
          // localStorage.setItem(
          //   'is_followed',
          //   JSON.stringify(this.is_following)
          // );
          // this.is_footmate = this.publicProfileData.footmate_status;
          this.data = { ...this.data, ...this.publicProfileData };
          console.log('this is my data');
          console.log(this.data);
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  getSearchText(value: string) {
    this.searchText = value;
    this.filter.search = this.searchText;
    this.filter.page_no = 1;
    this.selectedPage = 1;
    this.getTraningCenterList(this.userId, this.pageSize, 1);
  }

  // AddPlayerPopUp
  onAddFootPlayer() {
    const data = this.getSelectedRows();
    console.log('onAddFootPlayer data is', data);
    const dialogRef = this.dialog.open(StatusConfirmationComponent, {
      panelClass: 'statusconfirmation',
      data: {
        header: 'Assign Training Center',
        message: 'Do you want to assign Traning Center?',
        acceptText: 'Yes',
        rejectText: 'No'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._footPlayerService
          .assignTrainingCenter(this.send_to, data)
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
  // delete
  deleteFootplayerPopup(id: string) {
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
              // this.getFootPlayerList();
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

  getTab(value: string) {
    this.tab = value;
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
