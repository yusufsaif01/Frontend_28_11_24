import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@env/environment';
@Component({
  selector: 'app-attendance-history-view',
  templateUrl: './attendance-history-view.component.html',
  styleUrls: ['./attendance-history-view.component.scss']
})
export class AttendanceHistoryViewComponent implements OnInit {
  attendanceData: any = [];
  selectedDate: string = '';
  public dataSource = new MatTableDataSource([]);
  environment = environment;
  ngOnInit(): void {
    // Access the state directly from the browser's history
    const state = history.state;
    if (state) {
      this.attendanceData = state.attendanceData.data || [];
      this.selectedDate = state.selectedDate || '';
      if (!this.attendanceData.player_details.avatar_url) {
        this.attendanceData.player_details.avatar_url =
          this.environment.mediaUrl + '/uploads/avatar/user-avatar.png';
      }
    } else {
      console.log('No state data found');
    }
    this.dataSource = new MatTableDataSource(this.attendanceData);

    console.log('Attendance data:', this.attendanceData);
    console.log('Selected date:', this.selectedDate);
    console.log('this.dataSourceeeeeee', this.dataSource);
  }
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'http://localhost:3000/uploads/avatar/user-avatar.png'; // Replace with your fallback URL
  }
  capitalizeFirst(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
