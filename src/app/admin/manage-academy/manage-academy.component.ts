import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageAcademyTableConfig } from './manage-academy-table-conf';
import { FilterDialogAcademyComponent } from '../filter-dialog-academy/filter-dialog-academy.component';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-manage-academy',
  templateUrl: './manage-academy.component.html',
  styleUrls: ['./manage-academy.component.scss']
})
export class ManageAcademyComponent implements OnInit {
  sideBarToogle: boolean = false;
  showFiller = false;
  list: any;
  pageSize: number;

  public tableConfig: ManageAcademyTableConfig = new ManageAcademyTableConfig();
  public dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog, public adminService: AdminService) {}

  ngOnInit() {
    this.getAcademyList(this.pageSize);
  }

  getAcademyList(page_size: number) {
    this.adminService
      .getAcademyList({
        page_no: 1,
        page_size: page_size
      })
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data.records);
      });
  }

  recordsPerPage(event: any) {
    this.pageSize = event.target.value;
    this.getAcademyList(this.pageSize);
  }

  sampleModel() {
    const dialogRef = this.dialog.open(FilterDialogAcademyComponent, {
      width: '50% ',
      panelClass: 'filterDialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('original', result);
      if (result) {
        if (result['from']) {
          result['from'] = new Date(result['from']).toISOString();
        }
        if (result['to']) {
          result['to'] = new Date(result['to']).toISOString();
        }
        console.log('The dialog was closed');
        this.adminService.getAcademyList(result).subscribe(response => {
          this.dataSource = new MatTableDataSource(response.data.records);
        });
      } else {
        console.log('filter data not provided');
      }
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

  applyFilter(event: any) {
    let filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
