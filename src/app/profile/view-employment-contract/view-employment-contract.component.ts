import { Component, OnInit } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { MatDialog } from '@angular/material/dialog';
import { StatusConfirmationComponent } from '@app/shared/dialog-box/status-confirmation/status-confirmation.component';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { DisapproveConfirmationComponent } from '@app/shared/dialog-box/disapprove-confirmation/disapprove-confirmation.component';

@Component({
  selector: 'app-view-employment-contract',
  templateUrl: './view-employment-contract.component.html',
  styleUrls: ['./view-employment-contract.component.scss']
})
export class ViewEmploymentContractComponent implements OnInit {
  panelOptions: Partial<PanelOptions> = {
    player_type: false,
    logout_link: true,
    achievements: true,
    footplayers: true,
    is_public: false
  };

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onapproved(): void {
    const dialogRef = this.dialog.open(StatusConfirmationComponent, {
      width: '50%',
      data: {
        header: 'Please Confirm',
        message:
          'Do you want to approve the Employment Contract with XYZ club/ academy ?'
      }
    });
  }

  ondisapproved(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50%',
      data: {
        header: 'Please Confirm',
        message: 'Please specify a reason for disapproval',
        disApprove: true
      }
    });
  }
}
