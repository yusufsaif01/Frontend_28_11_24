import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManagePrivacyTableConfig } from './manage-privacy-table-conf';
import { PersonAddEditPopupComponent } from './person-add-edit-popup/person-add-edit-popup.component';
import { ManagePrivacyService } from './manage-privacy-service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { StatusConfirmationComponent } from '@app/shared/dialog-box/status-confirmation/status-confirmation.component';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-manage-privacy',
  templateUrl: './manage-privacy.component.html',
  styleUrls: ['./manage-privacy.component.scss']
})
export class ManagePrivacyComponent implements OnInit, OnDestroy {
  public tableConfig: ManagePrivacyTableConfig = new ManagePrivacyTableConfig();
  public dataSource = new MatTableDataSource([]);

  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }

  constructor(
    public dialog: MatDialog,
    private managePrivacyService: ManagePrivacyService,
    private toastrService: ToastrService
  ) {}

  ngOnDestroy() {}

  ngOnInit() {
    this.getWhiteList();
  }

  getWhiteList() {
    this.managePrivacyService
      .getWhiteList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          this.dataSource = new MatTableDataSource(records);
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PersonAddEditPopupComponent, {
      width: '50%',
      data: {
        options: { header: 'Add', buttonName: 'Save' }
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getWhiteList();
      }
    });
  }

  editRow(id: any, name: any, phone: any, email: any) {
    let data = { id, name, phone, email };
    const dialogRef = this.dialog.open(PersonAddEditPopupComponent, {
      width: '50%',
      data: {
        data,
        options: { header: 'Edit', buttonName: 'Update' }
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getWhiteList();
      }
    });
  }

  statusPopup(id: string, status: string) {
    if (status === 'pending') {
      return;
    }
    const dialogRef = this.dialog.open(StatusConfirmationComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.managePrivacyService
          .updateStatus(id, { status: status })
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this.toastrService.success(
                `Success`,
                'Status updated successfully'
              );
              this.getWhiteList();
            },
            error => {
              this.toastrService.error(
                `${error.error.message}`,
                'Status update'
              );
            }
          );
      }
    });
  }

  deletePopup(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Delete person',
        message: 'Are you sure you want to delete the person ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.managePrivacyService
          .deleteUser(id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this.toastrService.success(
                `Success`,
                'Person deleted successfully'
              );
              this.getWhiteList();
            },
            error => {
              this.toastrService.error(
                `${error.error.message}`,
                'Delete person'
              );
            }
          );
      }
    });
  }
}
