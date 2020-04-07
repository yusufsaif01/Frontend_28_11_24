import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageAcademyTableConfig } from './manage-academy-table-conf';
import { FilterDialogAcademyComponent } from '../filter-dialog-academy/filter-dialog-academy.component';

@Component({
  selector: 'app-manage-academy',
  templateUrl: './manage-academy.component.html',
  styleUrls: ['./manage-academy.component.scss']
})
export class ManageAcademyComponent implements OnInit {
  list: any;
  public tableConfig: ManageAcademyTableConfig = new ManageAcademyTableConfig();
  dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.sampleModel();
  }

  sampleModel() {
    const dialogRef = this.dialog.open(FilterDialogAcademyComponent, {
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
