import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentVerificationTableConfig } from './document-verification-table-conf';
import { ActivatedRoute } from '@angular/router';
import { DocumentVerificationService } from './document-verification-service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { untilDestroyed } from '@app/core';
import { VerificationPopupComponent } from '@app/admin/verification-popup/verification-popup.component';
import { environment } from '@env/environment';

interface ResponseContext {
  added_on: string;
  date_of_birth: string;
  name: string;
  player_name: string;
  document_type: string;
  document_image: string;
  document_number: string;
  status: string;
  aadhaarimg: string;
  document: string;
  user_photo: string;
}

@Component({
  selector: 'app-document-verification',
  templateUrl: './document-verification.component.html',
  styleUrls: ['./document-verification.component.scss']
})
export class DocumentVerificationComponent implements OnInit {
  public sideBarToggle: boolean = true;
  public tableConfig: DocumentVerificationTableConfig;
  public dataSource = new MatTableDataSource([]);

  member_type: string;
  user_id: string;
  documentDetails: any;
  responsePopulated: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _documentVerficationService: DocumentVerificationService,
    private _toastrService: ToastrService,
    public dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe(param => {
      this.user_id = param.id;
      this.member_type = param.member_type;
      this.tableConfig = new DocumentVerificationTableConfig(this.member_type);
    });
  }

  ngOnInit() {
    this.getDocumentStatus();
  }

  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }

  getDocumentStatus() {
    this._documentVerficationService
      .getStatus(this.user_id, this.member_type)
      .subscribe(
        response => {
          this.documentDetails = response.data;
          let modifiedResponse = this.prepareResponse(this.documentDetails);
          this.dataSource = new MatTableDataSource([modifiedResponse]);
        },
        error => {
          console.log(error);
        }
      );
  }

  prepareResponse(data: any) {
    let document = data.documents[0];

    let modifiedResponse: Partial<ResponseContext> = {
      player_name: data.player_name ? data.player_name : '',
      name: data.name ? data.name : '',
      added_on: document.added_on,
      date_of_birth: data.date_of_birth ? data.date_of_birth : '',
      document_number: document.document_number ? document.document_number : '',
      document_type: document.type ? document.type : '',
      status: document.status,
      aadhaarimg:
        this.attachDocumentUrl(document.media.doc_front) +
        '---' +
        this.attachDocumentUrl(document.media.doc_back),
      document_image: this.attachDocumentUrl(document.media.document),
      user_photo: this.attachDocumentUrl(document.media.user_photo)
    };

    return modifiedResponse;
  }

  attachDocumentUrl(documentUrl: string) {
    return environment.mediaUrl + documentUrl;
  }

  approveDocument(type: string) {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Approve',
        message: `Do you want to approve aadhaar details of ${this.documentDetails.player_name} player ?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._documentVerficationService
          .updateStatus(this.user_id, this.member_type, {
            status: 'approved',
            type: type
          })
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this.getDocumentStatus();
              this._toastrService.success(
                `Success`,
                'Status updated successfully'
              );
            },
            error => {
              // log.debug(`Login error: ${error}`);
              this._toastrService.error(
                `${error.error.message}`,
                'Verification'
              );
            }
          );
      }
    });
  }

  disapproveDocument(type: string) {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Disapprove',
        message: `Please specify a reason for disapproval`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._documentVerficationService
          .updateStatus(this.user_id, this.member_type, {
            remarks: result,
            status: 'disapproved',
            type: type
          })
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this.getDocumentStatus();
              this._toastrService.success(
                `Success`,
                'Status updated successfully'
              );
            },
            error => {
              // log.debug(`Login error: ${error}`);
              this._toastrService.error(
                `${error.error.message}`,
                'Verification'
              );
            }
          );
      }
    });
  }
  ngOnDestroy() {}

  openDialog(event: string) {
    console.log(event);
  }
}
