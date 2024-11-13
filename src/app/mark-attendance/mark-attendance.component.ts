import { Component, OnInit, OnDestroy } from '@angular/core';

import { PanelOptions } from '@app/shared/models/panel-options.model';
import { environment } from '@env/environment';
import { FootPlayerService } from './foot-player.service';
import { untilDestroyed } from '@app/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusConfirmationComponent } from '@app/shared/dialog-box/status-confirmation/status-confirmation.component';
import { SharedService } from '@app/shared/shared.service';
declare let gtag: Function;

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' }
  // Add more data if needed
];
@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss']
})
export class MarkAttendanceComponent implements OnInit {
  //public dataSource = new MatTableDataSource([]);
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
  send_to = '';
  serial_no = 1;
  i = 1;
  displayedColumns: string[] = [
    'serialNo',
    'name',
    'email',
    'category',
    'action'
  ];
  public dataSource = new MatTableDataSource([]);
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
    private _toastrService: ToastrService,
    private _sharedService: SharedService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.filter.page_size = this.pageSize;
    this.filter.page_no = this.pageNo;
    this.getFootPlayerList();
    this._activatedRoute.params.subscribe(param => {
      if (param.send_to) {
        this.send_to = param.send_to;
        console.log('player id is', this.send_to);
      }
    });
  }

  ngOnDestroy() {}

  addFootplayerbuttonclick() {
    gtag('event', 'track_AddPlayer_button_click', {
      event_category: 'Button',
      event_label: 'Add Player Button',
      value: 1
    });
  }
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
  markAttendance() {
    // Logic for marking attendance based on selected radio button values
    const markedRows = this.dataSource.data.filter(row => row.action);
    markedRows.forEach(row => {
      console.log(`Marking attendance for ${row.name}: ${row.action}`);
      // Implement additional attendance marking logic here if needed
    });
  }

  saveDraft() {
    // Logic to save the current state as a draft
    console.log('Draft saved');
    // Implement save draft logic here
  }
  getFootPlayerList() {
    this._footPlayerService
      .getFootPlayerList(this.filter)
      // .pipe(untilDestroyed(this))
      .subscribe(response => {
        let records = response.data.records;
        // for (let i = 0; i < records.length; i++) {
        //   records[i]['avatar'] = records[i]['avatar'];
        // }
        console.log('response is++++++++++', response.data.records);
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
  // Manage Player
  managePlayer(id: string) {}
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
