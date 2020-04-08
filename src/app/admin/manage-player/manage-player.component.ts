import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
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
  sideBarToogle: boolean = false;
  showFiller = false;
  list: any;
  pageSize: number;

  public tableConfig: ManagePlayerTableConfig = new ManagePlayerTableConfig();
  public dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog, public adminService: AdminService) {}

  ngOnInit() {
    this.getPlayerList(this.pageSize);
  }

  getPlayerList(page_size: number) {
    this.adminService
      .getPlayerList({
        page_no: 1,
        page_size: page_size
      })
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data.records);
      });
  }

  recordsPerPage(event: any) {
    this.pageSize = event.target.value;
    this.getPlayerList(this.pageSize);
  }

  sampleModel() {
    const dialogRef = this.dialog.open(FilterDialogPlayerComponent, {
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
        console.log('treated result', result);
        console.log('The dialog was closed');
        this.adminService.getPlayerList(result).subscribe(response => {
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
