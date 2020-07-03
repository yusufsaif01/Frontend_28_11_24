import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageClubTableConfig } from './manage-club-table-conf';
import { FilterDialogClubComponent } from '../filter-dialog-club/filter-dialog-club.component';
import { AdminService } from '../admin.service';
import { DeleteConfirmationComponent } from '../../shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { StatusConfirmationComponent } from '../../shared/dialog-box/status-confirmation/status-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';

interface FilterDialogContext {
  from: string;
  to: string;
  email: string;
  name: string;
  email_verified: string;
  profile_status: string;
}
@Component({
  selector: 'app-manage-club',
  templateUrl: './manage-club.component.html',
  styleUrls: ['./manage-club.component.scss']
})
export class ManageClubComponent implements OnInit, OnDestroy {
  public sideBarToggle: boolean = true;
  showFiller = false;
  list: any;
  pageSize: number = 20;
  totalRecords = 10;
  selectedPage: number;
  clubs_count: number;
  show_count: number;
  tzoffset = new Date().getTimezoneOffset() * 60000;
  dialogData: FilterDialogContext;

  public tableConfig: ManageClubTableConfig = new ManageClubTableConfig();
  public dataSource = new MatTableDataSource([]);

  constructor(
    public dialog: MatDialog,
    public adminService: AdminService,
    public toastrService: ToastrService
  ) {}

  ngOnDestroy() {}

  ngOnInit() {
    this.getClubList(this.pageSize, 1);
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

  getClubList(page_size: number, page_no: number, search?: string) {
    this.adminService
      .getClubList({
        page_no: page_no,
        page_size: page_size,
        search: search
      })
      .pipe(untilDestroyed(this))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data.records);
        this.clubs_count = response.data.total;
        this.show_count = response.data.records.length;
        this.selectedPage = page_no;
      });
  }

  recordsPerPage(event: any) {
    this.pageSize = event.target.value;
    this.getClubList(this.pageSize, 1);
  }

  updatePage(event: any) {
    this.getClubList(this.pageSize, event.selectedPage);
  }

  sampleModel() {
    const dialogRef = this.dialog.open(FilterDialogClubComponent, {
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
        this.adminService
          .getClubList(result)
          .pipe(untilDestroyed(this))
          .subscribe(response => {
            this.clubs_count = response.data.total;
            this.show_count = response.data.records.length;
            this.dataSource = new MatTableDataSource(response.data.records);
            this.selectedPage = 1;
          });
      }
    });
  }

  deletePopup(user_id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Delete Club'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.adminService
          .deleteUser({ user_id: user_id })
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this.toastrService.success(
                `Success`,
                'User deleted successfully'
              );
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
          this.adminService
            .deactivateUser({ user_id: user_id })
            .pipe(untilDestroyed(this))
            .subscribe(
              response => {
                this.toastrService.success(
                  `Success`,
                  'Status updated successfully'
                );
                this.getClubList(this.pageSize, 1);
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
          this.adminService
            .activeUser({ user_id: user_id })
            .pipe(untilDestroyed(this))
            .subscribe(
              response => {
                this.toastrService.success(
                  `Success`,
                  'Status updated successfully'
                );
                this.getClubList(this.pageSize, 1);
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

  getSearchText(value: string) {
    let filterValue = value;
    this.getClubList(this.pageSize, 1, filterValue);
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
