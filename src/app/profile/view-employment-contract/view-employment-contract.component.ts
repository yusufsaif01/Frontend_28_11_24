import { Component, OnInit } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { MatDialog } from '@angular/material/dialog';
import { StatusConfirmationComponent } from '@app/shared/dialog-box/status-confirmation/status-confirmation.component';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';

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
        header: 'Yes'
      }
    });
  }

  ondisapproved(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50%'
    });
  }
}
