import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManagePlayerTableConfig } from './manage-player-table-conf';
import { FilterDialogPlayerComponent } from '../filter-dialog-player/filter-dialog-player.component';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-manage-player',
  templateUrl: './manage-player.component.html',
  styleUrls: ['./manage-player.component.scss']
})
export class ManagePlayerComponent implements OnInit {
  list: any;
  public tableConfig: ManagePlayerTableConfig = new ManagePlayerTableConfig();
  dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog, public adminService: AdminService) {}

  ngOnInit() {
    // this.sampleModel();
    this.adminService
      .getPlayerList({
        page_no: 1,
        page_size: 20
      })
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data.records);
      });
  }

  sampleModel() {
    const dialogRef = this.dialog.open(FilterDialogPlayerComponent, {
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
    // this.dataSource = new MatTableDataSource(this.list);
  }
}
