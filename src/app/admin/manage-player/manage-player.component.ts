import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManagePlayerTableConfig } from './manage-player-table-conf';
import { FilterDialogPlayerComponent } from '../filter-dialog-player/filter-dialog-player.component';
import { AdminService } from '../admin.service';
import { DeleteConfirmationComponent } from '../../shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { StatusConfirmationComponent } from '../../shared/dialog-box/status-confirmation/status-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';

interface FilterDialogContext {
  from: string;
  to: string;
  name: string;
  type: string;
  email: string;
  position: string;
  email_verified: string;
  profile_status: string;
}
@Component({
  selector: 'app-manage-player',
  templateUrl: './manage-player.component.html',
  styleUrls: ['./manage-player.component.scss']
})
export class ManagePlayerComponent implements OnInit, OnDestroy {
  public sideBarToggle: boolean = true;
  showFiller = false;
  list: any;
  pageSize: number = 5;
  selectedPage: number;
  players_count: number;
  grassroot_count: number;
  amateur_count: number;
  proff_count: number;
  show_count: number;
  tzoffset = new Date().getTimezoneOffset() * 60000;
  dialogData: FilterDialogContext;
  filterValues: any = {};

  public tableConfig: ManagePlayerTableConfig = new ManagePlayerTableConfig();
  public dataSource = new MatTableDataSource([]);

  constructor(
    public dialog: MatDialog,
    public adminService: AdminService,
    public toastrService: ToastrService
  ) {}

  ngOnDestroy() {}

  ngOnInit() {
    this.filterValues = {};
    this.getPlayerList(this.pageSize, 1);
    this.refreshDialogData();
  }

  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }

  refreshDialogData() {
    this.dialogData = {
      from: '',
      to: '',
      name: '',
      type: '',
      email: '',
      position: '',
      email_verified: '',
      profile_status: ''
    };
  }

  getPlayerList(page_size: number, page_no: number, search?: string) {
    this.adminService
      .getPlayerList({
        ...{
          page_no: page_no,
          page_size: page_size,
          search: search
        },
        ...this.filterValues
      })
      .pipe(untilDestroyed(this))
      .subscribe(response => {
        this.dataSource = new MatTableDataSource(response.data.records);
        this.players_count = response.data.total;
        this.show_count = response.data.records.length;
        this.amateur_count = response.data.players_count.amateur;
        this.grassroot_count = response.data.players_count.grassroot;
        this.proff_count = response.data.players_count.professional;
        this.selectedPage = page_no;
      });
  }

  recordsPerPage(event: any) {
    this.pageSize = event.target.value;
    this.filterValues.page_size = event.target.value;
    this.filterValues.page_no = 1;
    this.getPlayerList(this.pageSize, 1);
  }

  updatePage(event: any) {
    this.filterValues.page_no = event.selectedPage;
    this.getPlayerList(this.pageSize, event.selectedPage);
  }

  sampleModel() {
    const dialogRef = this.dialog.open(FilterDialogPlayerComponent, {
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
        result.page_size = this.pageSize;
        result.page_no = 1;
        this.filterValues = result;
        this.adminService
          .getPlayerList(result)
          .pipe(untilDestroyed(this))
          .subscribe(response => {
            this.players_count = response.data.total;
            this.show_count = response.data.records.length;
            this.dataSource = new MatTableDataSource(response.data.records);
            this.selectedPage = 1;
          });
      } else {
        this.filterValues = {};
      }
    });
  }

  deletePopup(user_id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Delete Player'
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
                this.getPlayerList(this.pageSize, 1);
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
                this.getPlayerList(this.pageSize, 1);
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
    this.getPlayerList(this.pageSize, 1, filterValue);
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
