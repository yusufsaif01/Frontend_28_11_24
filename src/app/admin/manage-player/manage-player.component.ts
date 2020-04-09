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
import { DeleteConfirmationComponent } from '../../shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { StatusConfirmationComponent } from '../../shared/dialog-box/status-confirmation/status-confirmation.component';

@Component({
  selector: 'app-manage-player',
  templateUrl: './manage-player.component.html',
  styleUrls: ['./manage-player.component.scss']
})
export class ManagePlayerComponent implements OnInit {
  sideBarToogle: boolean = true;
  showFiller = false;
  list: any;
  pageSize: number =20;
  totalRecords = 10;
  players_count: number;
  grassroot_count :number;
  amateur_count :number;
  proff_count: number;

  public tableConfig: ManagePlayerTableConfig = new ManagePlayerTableConfig();
  public dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog, public adminService: AdminService) {}

  ngOnInit() {
    this.getPlayerList(this.pageSize,1);
  }

  getPlayerList(page_size: number,page_no:number) {
    this.adminService
      .getPlayerList({
        page_no: page_no,
        page_size: page_size
      })
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data.records);
        this.players_count = response.data.total;
        this.amateur_count =  response.data.players_count.amateur;
        this.grassroot_count = response.data.players_count.grassroot;
        this.proff_count = response.data.players_count.professional;
      });
  }

  recordsPerPage(event: any) {
    this.pageSize = event.target.value;
    console.log('PAGE_SIZE',this.pageSize);    
    this.getPlayerList(this.pageSize,1);
  }

  updatePage(event: any) {
    // console.log(event);
    this.getPlayerList(this.pageSize,event.selectedPage)
    // console.log(event.target.value);
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

  deletePopup() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data :{}
    });
    dialogRef.afterClosed().subscribe((result)=>{
      console.log('popup closed');  
      console.log('result',result);
      if(result){
        this.adminService.deleteUser({user_id:'123'})
          .subscribe((response)=>{
            console.log(response);
          })
      }else{
        console.log('not true')
      }
    })
  }

  statusPopup() {
    const dialogRef = this.dialog.open(StatusConfirmationComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data :{}
    });
    dialogRef.afterClosed().subscribe((result)=>{
      console.log('popup closed');  
      console.log('result',result);
      // deactive user not implemented
      if(result === true){
        this.adminService.activeUser({user_id:'123'})
          .subscribe((response)=>{
            console.log(response);
          })
      }
    })
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
