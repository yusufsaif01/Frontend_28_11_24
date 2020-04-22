import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { AwardCertificateTableConfig } from './award-certificate-table-conf';
import { EditAddPopupComponent } from './edit-add-popup/edit-add-popup.component';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { AwardCertificateService } from './award-certificate.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-award-certificate',
  templateUrl: './award-certificate.component.html',
  styleUrls: ['./award-certificate.component.scss']
})
export class AwardCertificateComponent implements OnInit {
  public tableConfig: AwardCertificateTableConfig = new AwardCertificateTableConfig();
  public dataSource = new MatTableDataSource([]);
  pageSize: number = 20;
  environment = environment;
  player_type: string;

  panelOptions: object = {
    bio: true,
    member_type: true,
    my_achievements: false,
    view_profile_link: true
  };

  constructor(
    public dialog: MatDialog,
    private awardCertificateService: AwardCertificateService
  ) {}

  // dialog box open
  ngOnInit() {
    this.getAwardsList(this.pageSize, 1);
  }

  // dialog box open
  openDialog(): void {
    const dialogRef = this.dialog.open(EditAddPopupComponent, {
      width: '40%',
      panelClass: 'edit-add-popup',
      data: { player_type: this.player_type }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') this.ngOnInit();
    });
  }

  openEditDialog(
    id: any,
    media: any,
    name: any,
    position: any,
    type: any,
    year: any
  ) {
    let data: any = {
      id: id,
      media: media,
      name: name,
      position: position,
      type: type,
      year,
      player_type: this.player_type
    };
    const dialogRef = this.dialog.open(EditAddPopupComponent, {
      width: '40%',
      panelClass: 'edit-add-popup',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') this.ngOnInit();
    });
  }

  getPlayerType(value: string) {
    console.log(value);
    this.player_type = value;
  }

  getAwardsList(page_size: number, page_no: number) {
    this.awardCertificateService
      .getAwardsList({ page_size, page_no })
      .subscribe(
        response => {
          console.log('Response', response);
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['serialnumber'] = i + 1;
            records[i]['media'] = environment.mediaUrl + records[i]['media'];
          }
          this.dataSource = new MatTableDataSource(records);
        },
        error => {
          console.log('ERROR', error);
        }
      );
  }

  // delete
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
}
