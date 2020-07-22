import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { MatTableDataSource } from '@angular/material/table';
import { ContractManagementTableConfig } from './contract-management-table.conf';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material';
import { ContractManagementService } from './contract-management.service';
import { untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';

@Component({
  selector: 'app-contract-management',
  templateUrl: './contract-management.component.html',
  styleUrls: ['./contract-management.component.scss']
})
export class ContractManagementComponent implements OnInit, OnDestroy {
  public tableConfig: ContractManagementTableConfig = new ContractManagementTableConfig();
  public dataSource = new MatTableDataSource([]);
  pageSize: number = 10;
  selectedPage: number = 1;
  member_type: string;
  show_count: number;
  total_count: number;
  environment = environment;

  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    is_public: false,
    is_league: true
  };

  constructor(
    public dialog: MatDialog,
    private _contractManagementService: ContractManagementService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getContractList(this.pageSize, 1);
  }

  ngOnDestroy() {}

  getMemberType(value: string) {
    this.member_type = value;
  }

  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.getContractList(this.pageSize, event.selectedPage);
  }

  deletePopup(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '40% ',
      panelClass: 'filterDialog',
      data: {
        message: 'Are you sure you want to delete?',
        acceptText: 'Confirm',
        rejectText: 'Cancel'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._contractManagementService
          .deleteContract({ id })
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                'success',
                'Employment contract deleted successfully'
              );
              this.selectedPage = 1;
              this.getContractList(this.pageSize, 1);
            },
            error => {
              this._toastrService.error(`${error.error.message}`, 'Error');
            }
          );
      }
    });
  }

  getContractList(page_size: number, page_no: number) {
    this._contractManagementService
      .getContractList({ page_no, page_size })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
          }
          this.dataSource = new MatTableDataSource(records);
          this.show_count = response.data.records.length;
          this.total_count = response.data.total;
          this.selectedPage = page_no;
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }
}
