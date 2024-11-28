import { Component, OnInit, Inject } from '@angular/core';
import { AttendanceService } from '../../attendance.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-date-list-popup',
  templateUrl: './date-list-popup.component.html',
  styleUrls: ['./date-list-popup.component.scss']
})
export class DateListPopupComponent implements OnInit {
  dates: string[] = []; // To store the passed dates
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DateListPopupComponent>,
    private _attendanceService: AttendanceService,
    private router: Router // Router for navigation
  ) {}

  ngOnInit(): void {
    console.log('Received data:', this.data);
    this.dates = this.data.dates; // Assign passed dates to the component property
  }
  onDateClick(alldate: string): void {
    console.log('Date clicked:', alldate);
    console.log('All data is', this.data);
    const center_id = this.data.center_id;
    // Call the API to fetch data for the selected date
    this._attendanceService
      .getAttendanceDetails(center_id, { alldate })
      .subscribe({
        next: response => {
          console.log('Fetched data for date:', response);

          // Navigate to AttendanceHistoryViewComponent with fetched data

          this.router.navigate(['member/attendance-history-view'], {
            state: {
              attendanceData: response,
              selectedDate: alldate
            }
          });

          // Optionally close the dialog
          this.dialogRef.close();
        },
        error: error => {
          console.error('Error fetching data for date:', error);
        }
      });
  }
}
