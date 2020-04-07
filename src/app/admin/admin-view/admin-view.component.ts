import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdminViewTableConfig } from './admin-view-table-conf';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  list: any;
  public tableConfig: AdminViewTableConfig = new AdminViewTableConfig();
  dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.sampleModel();
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
    this.dataSource = new MatTableDataSource(this.list);
  }
}
