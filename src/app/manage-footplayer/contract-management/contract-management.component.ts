import { Component, OnInit } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { MatTableDataSource } from '@angular/material/table';
import { ContractManagementTableConfig } from './contract-management-table.conf';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-contract-management',
  templateUrl: './contract-management.component.html',
  styleUrls: ['./contract-management.component.scss']
})
export class ContractManagementComponent implements OnInit {
  public tableConfig: ContractManagementTableConfig = new ContractManagementTableConfig();
  public dataSource = new MatTableDataSource([]);

  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    is_public: false,
    is_league: true
  };

  constructor(public dialog: MatDialog) {}
  deletePopup(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50%',
      data: {
        header: 'Please Confirm',
        message: 'Are you sure you want to delete?'
      }
    });
  }

  ngOnInit() {}
}
