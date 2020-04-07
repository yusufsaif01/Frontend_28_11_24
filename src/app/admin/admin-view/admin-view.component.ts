import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdminViewTableConfig } from './admin-view-table-conf';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  list: any;
  public tableConfig: AdminViewTableConfig = new AdminViewTableConfig();
  dataSource = new MatTableDataSource([]);

  constructor(
    public dialog     : MatDialog,
    public adminService: AdminService
  ) {}

  ngOnInit() {
    // this.sampleModel();
    this.adminService.getPlayerList({
      page_no:1,
      page_size:20
    }).subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response.data.records);
      }
    )
  }

  sampleModel() {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '72.75%',
      panelClass: 'filterDialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
    });

    this.list = [
      {
        title: 'Yes',
        type: 'ABC',
        quiz_mapped: 'Yes'
      }
    ];
    // this.dataSource = new MatTableDataSource(this.list);
  }
}
