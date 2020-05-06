import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageAcademyTableConfig } from './manage-academy-table-conf';
import { FilterDialogAcademyComponent } from '../filter-dialog-academy/filter-dialog-academy.component';
import { AdminService } from '../service/admin.service';
import { DeleteConfirmationComponent } from '../../shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { StatusConfirmationComponent } from '../../shared/dialog-box/status-confirmation/status-confirmation.component';
import { ToastrService } from 'ngx-toastr';

interface FilterDialogContext {
  from: string;
  to: string;
  name: string;
  email: string;
  email_verified: string;
  profile_status: string;
}
@Component({
  selector: 'app-manage-academy',
  templateUrl: './manage-academy.component.html',
  styleUrls: ['./manage-academy.component.scss']
})
export class ManageAcademyComponent implements OnInit {
  public sideBarToggle: boolean = true;
  showFiller = false;
  list: any;
  pageSize: number = 20;
  totalRecords = 10;
  acad_count: number;
  show_count: number;
  tzoffset = new Date().getTimezoneOffset() * 60000;
  dialogData: any = {};

  public tableConfig: ManageAcademyTableConfig = new ManageAcademyTableConfig();
  public dataSource = new MatTableDataSource([]);

  constructor(
    public dialog: MatDialog,
    public adminService: AdminService,
    public toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAcademyList(this.pageSize, 1);
    this.refreshDialogData();
  }

  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }

  refreshDialogData() {
    this.dialogData = {
      from: '',
      to: '',
      email: '',
      name: '',
      email_verified: '',
      profile_status: ''
    };
  }

  updatePage(event: any) {
    this.getAcademyList(this.pageSize, event.selectedPage);
  }

  getAcademyList(page_size: number, page_no: number, search?: string) {
    this.adminService
      .getAcademyList({
        page_no: page_no,
        page_size: page_size,
        search: search
      })
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data.records);
        this.acad_count = response.data.total;
        this.show_count = response.data.records.length;
      });
  }

  recordsPerPage(event: any) {
    this.pageSize = event.target.value;
    this.getAcademyList(this.pageSize, 1);
  }

  sampleModel() {
    const dialogRef = this.dialog.open(FilterDialogAcademyComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: this.dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogData = result;

        if (result['from']) {
          result['from'] = new Date(result['from']);
          result['from'] = new Date(
            result['from'] - this.tzoffset
          ).toISOString();
        }
        if (result['to']) {
          result['to'] = new Date(result['to']);
          result['to'] = new Date(result['to']).setHours(23, 59, 59);
          result['to'] = new Date(result['to'] - this.tzoffset).toISOString();
        }
        this.adminService.getAcademyList(result).subscribe(response => {
          this.acad_count = response.data.total;
          this.show_count = response.data.records.length;
          this.dataSource = new MatTableDataSource(response.data.records);
        });
      } else {
      }
    });
  }

  deletePopup(user_id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Delete Academy'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.adminService.deleteUser({ user_id: user_id }).subscribe(
          response => {
            this.toastrService.success(`Success`, 'User deleted successfully');
          },
          error => {
            // log.debug(`Login error: ${error}`);
            this.toastrService.error(`${error.error.message}`, 'Delete User');
          }
        );
      }
    });
  }

  statusPopup(user_id: string, status: string) {
    if (status === 'pending') {
      return;
    }
    const dialogRef = this.dialog.open(StatusConfirmationComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // deactive user not implemented
      if (result === true) {
        if (status === 'active') {
          this.adminService.deactivateUser({ user_id: user_id }).subscribe(
            response => {
              this.toastrService.success(
                `Success`,
                'Status updated successfully'
              );
              this.getAcademyList(this.pageSize, 1);
            },
            error => {
              // log.debug(`Login error: ${error}`);
              this.toastrService.error(
                `${error.error.message}`,
                'Status update'
              );
            }
          );
        } else if (status === 'blocked') {
          this.adminService.activeUser({ user_id: user_id }).subscribe(
            response => {
              this.toastrService.success(
                `Success`,
                'Status updated successfully'
              );
              this.getAcademyList(this.pageSize, 1);
            },
            error => {
              // log.debug(`Login error: ${error}`);
              this.toastrService.error(
                `${error.error.message}`,
                'Status update'
              );
            }
          );
        }
      }
    });
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    this.getAcademyList(this.pageSize, 1, filterValue);
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
