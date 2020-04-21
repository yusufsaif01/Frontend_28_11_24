import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { AwardCertificateTableConfig } from './award-certificate-table-conf';
import { EditAddPopupComponent } from './edit-add-popup/edit-add-popup.component';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-award-certificate',
  templateUrl: './award-certificate.component.html',
  styleUrls: ['./award-certificate.component.scss']
})
export class AwardCertificateComponent implements OnInit {
  public tableConfig: AwardCertificateTableConfig = new AwardCertificateTableConfig();
  public dataSource = new MatTableDataSource([]);
  constructor(public dialog: MatDialog) {}

  // dialog box open
  openDialog(): void {
    const dialogRef = this.dialog.open(EditAddPopupComponent, {
      width: '40%',
      panelClass: 'edit-add-popup'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  // delele
  deletePopup(user_id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '40% ',
      panelClass: 'filterDialog',
      data: {
        message: 'Are you sure you want to delete',
        acceptText: 'Yes',
        rejectText: 'No'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // if (result === true) {
      //   this.adminService.deleteUser({ user_id: user_id }).subscribe(
      //     response => {
      //       this.toastrService.success(`Success`, 'User deleted successfully');
      //     },
      //     error => {
      //       // log.debug(`Login error: ${error}`);
      //       console.log('error', error);
      //       this.toastrService.error(`${error.error.message}`, 'Delete User');
      //     }
      //   );
      // }
    });
  }

  ngOnInit() {}
}
