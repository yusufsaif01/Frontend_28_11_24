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
import { AwardCertificateService } from './award-certificate.service';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { untilDestroyed } from '@app/core';
@Component({
  selector: 'app-award-certificate',
  templateUrl: './award-certificate.component.html',
  styleUrls: ['./award-certificate.component.scss']
})
export class AwardCertificateComponent implements OnInit, OnDestroy {
  public tableConfig: AwardCertificateTableConfig = new AwardCertificateTableConfig();
  public dataSource = new MatTableDataSource([]);
  pageSize: number = 10;
  currentPageNo: number = 1;
  selectedPage: number;
  environment = environment;
  player_type: string;
  member_type: string;
  show_count: number;
  total_count: number;

  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: false,
    view_profile_link: true,
    footplayers: true,
    is_public: false
  };
  isPublic: boolean = false;
  userId: string;

  constructor(
    public dialog: MatDialog,
    private awardCertificateService: AwardCertificateService,
    private toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.firstChild.params.subscribe(params => {
      console.log('Router params', params);
      if (params['handle']) {
        this.panelOptions.is_public = true;
        this.isPublic = true;
        this.userId = params['handle'];
      }
    });
  }

  ngOnDestroy() {}

  // dialog box open
  ngOnInit() {
    this.getAwardsList(this.pageSize, 1);
  }

  // dialog box open
  openDialog(): void {
    const dialogRef = this.dialog.open(EditAddPopupComponent, {
      width: '50%',
      panelClass: 'dialogbox',
      data: {
        player_type: this.player_type,
        member_type: this.member_type,
        options: { header: 'Add', buttonName: 'Submit' }
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAwardsList(this.pageSize, this.currentPageNo);
      }
    });
  }

  openEditDialog(
    id: any,
    media: any,
    name: any,
    position: any,
    type: any,
    from: any,
    to: any
  ) {
    let data: any = {
      id: id,
      media: media,
      name: name,
      position: position,
      type: type,
      from: from,
      to: to,
      player_type: this.player_type,
      member_type: this.member_type
    };
    const dialogRef = this.dialog.open(EditAddPopupComponent, {
      width: '50%',
      panelClass: 'dialogbox',
      data: {
        ...data,
        options: { header: 'Edit', buttonName: 'Update' }
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAwardsList(this.pageSize, this.currentPageNo);
      }
    });
  }

  getPlayerType(value: string) {
    this.player_type = value;
  }
  getMemberType(value: string) {
    this.member_type = value;
  }
  getAchievementCount(value: number) {
    this.total_count = value;
  }

  updatePage(event: any) {
    this.currentPageNo = event.selectedPage;
    this.getAwardsList(this.pageSize, event.selectedPage);
  }

  getAwardsList(page_size: number, page_no: number) {
    if (this.isPublic) {
      this.awardCertificateService
        .getPublicAwardsList(this.userId, { page_size, page_no })
        .pipe(untilDestroyed(this))
        .subscribe(response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['media'] = environment.mediaUrl + records[i]['media'];
          }
          this.dataSource = new MatTableDataSource(records);
          this.show_count = response.data.records.length;
          this.total_count = response.data.total;
          this.selectedPage = page_no;
        });
    } else {
      this.awardCertificateService
        .getAwardsList({ page_size, page_no })
        .pipe(untilDestroyed(this))
        .subscribe(response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['media'] = environment.mediaUrl + records[i]['media'];
          }
          this.dataSource = new MatTableDataSource(records);
          this.show_count = response.data.records.length;
          this.total_count = response.data.total;
          this.selectedPage = page_no;
        });
    }
  }

  // delete
  deletePopup(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '40% ',
      panelClass: 'filterDialog',
      data: {
        message: 'Are you sure you want to delete?',
        acceptText: 'Yes',
        rejectText: 'No'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.awardCertificateService
          .deleteAward({ id })
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this.toastrService.success(
                `Success`,
                'Award deleted successfully'
              );
              this.currentPageNo = 1;
              this.getAwardsList(this.pageSize, 1);
            },
            error => {
              // log.debug(`Login error: ${error}`);

              this.toastrService.error(
                `${error.error.message}`,
                'Delete Award'
              );
            }
          );
      }
    });
  }
}
