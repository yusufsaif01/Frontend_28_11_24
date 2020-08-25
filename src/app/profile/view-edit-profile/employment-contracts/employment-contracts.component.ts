import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmploymentContractListTableConfig } from './employment-contract-listing-table-conf';
import { ViewEditProfileService } from '../view-edit-profile.service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-employment-contracts',
  templateUrl: './employment-contracts.component.html',
  styleUrls: ['./employment-contracts.component.scss']
})
export class EmploymentContractsComponent implements OnInit {
  public tableConfig: EmploymentContractListTableConfig = new EmploymentContractListTableConfig();
  public dataSource = new MatTableDataSource([]);
  editMode: boolean = false;

  constructor(
    private _editProfileService: ViewEditProfileService,
    private _toastrService: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getEmploymentContractList();
  }
  toggleMode() {
    this.editMode = !this.editMode;
  }
  getEmploymentContractList() {
    this._editProfileService
      .getEmploymentContractList()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          let records = response.data.records;
          this.dataSource = new MatTableDataSource(records);
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }
  deletePopup(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'delelepopup',
      data: {
        message: 'Are you sure you want to delete?',
        acceptText: 'Confirm',
        rejectText: 'Cancel'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._editProfileService
          .deleteContract(id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                'Success',
                'Employment contract deleted successfully'
              );

              this.getEmploymentContractList();
            },
            error => {
              this._toastrService.error(`${error.error.message}`, 'Error');
            }
          );
      }
    });
  }
  ngOnDestroy() {}
}
