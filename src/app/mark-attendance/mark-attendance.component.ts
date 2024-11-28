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
  academy_user_id = '';
  i = 1;
  displayedColumns: string[] = ['serialNo', 'name', 'email', 'phone', 'action'];
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
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.filter.page_size = this.pageSize;
    this.filter.page_no = this.pageNo;
    this.academy_user_id = localStorage.getItem('user_id');
    this._activatedRoute.params.subscribe(param => {
      if (param.send_to) {
        this.send_to = param.send_to;
        console.log('player id is', this.send_to);
        this.getFootPlayerList(this.send_to);
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
  }

  markAttendance() {
    // Gather all marked rows with attendance data into an array

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const markedRows = this.dataSource.data
      .filter(row => row.action)
      .map(row => ({
        center_user_id: this.send_to,
        player_user_id: row.user_id,
        status: row.action,
        date: formattedDate,
        academy_user_id: this.academy_user_id
      }));

    if (markedRows.length === 0) {
      console.log('No attendance to mark');
      return; // Exit if there are no marked rows
    }

    console.log('Sending attendance data:', markedRows);

    // Send the entire array in a single request
    this._footPlayerService
      .markAttendanceBatch(markedRows) // Assuming markAttendanceBatch accepts an array
      .subscribe(
        response => {
          // Handle the response, updating data source and counts
          const records = response;
          console.log('Batch attendance response:', records);
          this._toastrService.success(
            `Success`,
            'Attendance Mark successfully'
          );
          this.router.navigate(['/member/attendance']);
        },
        error => {
          console.error('Error marking attendance in batch:', error);
          this._toastrService.error(`${error.error.message}`, 'Error');
          // Optionally, handle the error (e.g., show a notification)
        }
      );
  }

  saveDraft() {
    // Logic to save the current state as a draft
    console.log('Draft saved');
    // Implement save draft logic here
  }
  getFootPlayerList(traningCenter_userId) {
    console.log('inside getFootplayerListtttt');
    this._footPlayerService
      .getFootPlayerList(traningCenter_userId)
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
  }
}
