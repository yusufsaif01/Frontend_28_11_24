import {
  Component,
  OnInit,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import { AttendanceTableConfig } from './attendance-table.conf';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { environment } from '@env/environment';
import { AttendanceService } from './attendance.service';
import { untilDestroyed } from '@app/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { MatDatepicker } from '@angular/material/datepicker';
//import { AddFootplayerComponent } from '../manage-footplayer/foot-player/add-footplayer/add-footplayer.component';
import { StatusConfirmationComponent } from '@app/shared/dialog-box/status-confirmation/status-confirmation.component';
import { SharedService } from '@app/shared/shared.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit, OnDestroy {
  public tableConfig: AttendanceTableConfig = new AttendanceTableConfig();
  public dataSource = new MatTableDataSource([]);
  sidebar: boolean = false;
  filter: any = {};
  pageSize: number = 10;
  pageNo: number = 1;
  selectedPage: number = 1;
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  selectedYear: number = new Date().getFullYear(); // Default to the current year
  selectedMonth: number = 0;
  selectedDates: (Date | null)[] = Array(12).fill(null);
  showDatePicker: boolean = false;
  selectedDate: string = '';
  // Generate a list of dates for the first day of each month in the current year
  monthDates = Array.from(
    { length: 12 },
    (_, i) => new Date(new Date().getFullYear(), i, 1)
  );
  environment = environment;
  formattedDates: string[] = Array(12).fill('');
  player_type: string;
  member_type: string;
  show_count: number;
  total_count: number;
  searchText = '';
  dataForHistory = [];
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
    private _footPlayerService: AttendanceService,
    public dialog: MatDialog,
    private _toastrService: ToastrService,
    private _sharedService: SharedService,
    private datePipe: DatePipe
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

  getMemberType(value: string) {
    this.member_type = value;
  }

  // openDatePicker(monthIndex: number) {
  //   this.selectedMonth = monthIndex;
  //   this.showDatePicker = true;
  // }

  closeDatePicker() {
    this.showDatePicker = false;
    this.selectedDate = '';
  }

  getMinDate(): string {
    return `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(
      2,
      '0'
    )}-01`;
  }

  getMaxDate(): string {
    const daysInMonth = new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0
    ).getDate();
    return `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(
      2,
      '0'
    )}-${daysInMonth}`;
  }
  confirmDate() {
    if (this.selectedDate) {
      this.showDatePicker = false;
      // Redirect to another page with selected date
      console.log('this.selectedDate', this.selectedDate);
    }
  }

  @ViewChildren('picker') datePickers: QueryList<MatDatepicker<any>>;
  // openDatePicker(index: number) {
  //   this.datePickers.toArray()[index].open();
  // }
  ngAfterViewInit() {
    // `datePickers` is fully available here
  }
  openDatePicker(index: number) {
    const datePickersArray = this.datePickers.toArray();
    this.selectedMonth = index;
    console.log('selected months is', this.selectedMonth);
    if (datePickersArray[index]) {
      // Set the selected date to the start of the month (e.g., January 1 for the first icon)
      const selectedDate = this.monthDates[index];

      // Set the date in the date picker and open it
      datePickersArray[index].select(selectedDate);
      datePickersArray[index].open();
    }
  }
  // Call this method when a date is selected to store the formatted month and day
  onDateChange(date: Date | null, index: number) {
    this.selectedDates[index] = date; // Store the raw date
    if (date) {
      this.formattedDates[index] = this.datePipe.transform(date, 'dd-MM') || ''; // Format as 'MMM dd' and store
      console.log(
        `Selected date for ${this.months[index]}: ${this.formattedDates[index]}`
      );
      console.log('selected year is', this.selectedYear);

      const alldate = this.formattedDates[index] + '-' + this.selectedYear;
      console.log('whole date is', alldate);
    } else {
      this.formattedDates[index] = '';
    }
  }

  // changeYear(direction: number) {
  //   this.selectedYear += direction;
  //   console.log('selected year is', this.selectedYear);
  // }
  changeYear(direction: number) {
    this.selectedYear += direction;
    console.log('selected year is', this.selectedYear);

    // Adjust dates if necessary
    this.selectedDates.forEach((date, index) => {
      if (date) {
        // Set the year of the date based on the updated selectedYear
        const updatedDate = new Date(date);
        updatedDate.setFullYear(this.selectedYear); // Update the year
        this.onDateChange(updatedDate, index);
      }
    });
  }
  selectMonth(monthIndex: number) {
    this.selectedMonth = monthIndex;
    console.log('selected months is', this.selectedMonth);
  }
  getSelectedDate(index: number): Date | null {
    return this.selectedDates[index];
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
        console.log(response.data);
        this.dataForHistory = response.data.records;
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
                'Traning Center deleted successfully'
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
