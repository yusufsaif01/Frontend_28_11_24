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
    private _toastrService: ToastrService
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
  ngOnDestroy() {}
}
