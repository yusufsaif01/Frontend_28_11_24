import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageClubTableConfig } from './manage-club-table-conf';
import { FilterDialogClubComponent } from '../filter-dialog-club/filter-dialog-club.component';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-manage-club',
  templateUrl: './manage-club.component.html',
  styleUrls: ['./manage-club.component.scss']
})
export class ManageClubComponent implements OnInit {
  list: any;
  public tableConfig: ManageClubTableConfig = new ManageClubTableConfig();
  dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog, public adminService: AdminService) {}

  ngOnInit() {
    // this.sampleModel();
    this.adminService
      .getClubList({
        page_no: 1,
        page_size: 20
      })
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data.records);
      });
  }

  sampleModel() {
    const dialogRef = this.dialog.open(FilterDialogClubComponent, {
      width: '50% ',
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
    this.dataSource = new MatTableDataSource(this.list);
  }
}
