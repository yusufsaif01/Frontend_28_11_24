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
  list: any;
  public tableConfig: ManageAcademyTableConfig = new ManageAcademyTableConfig();
  dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog, public adminService: AdminService) {}

  ngOnInit() {
    // this.sampleModel();
    this.adminService
      .getAcademyList({
        page_no: 1,
        page_size: 20
      })
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data.records);
      });
  }

  sampleModel() {
    const dialogRef = this.dialog.open(FilterDialogAcademyComponent, {
      width: '50% ',
      panelClass: 'filterDialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('original',result);
      if(result){
        if(result['from']){
          result['from']  = new Date(result['from']).toISOString()
        }
        if(result['to']){
          result['to']    = new Date(result['to']).toISOString()
        }
        console.log('The dialog was closed');
        this.adminService
        .getAcademyList(result)
        .subscribe(response => {
          this.dataSource = new MatTableDataSource(response.data.records);
        });
      }else{
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
}
