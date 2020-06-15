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
  aiff_id: string;
  aiff_image: string;
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
      .getDocumentStatus(this.user_id, this.member_type)
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
      date_of_birth: data.date_of_birth ? data.date_of_birth : '',
      added_on: document.added_on,
      document_number: document.document_number ? document.document_number : '',
      aiff_id: document.document_number ? document.document_number : '',
      document_type: document.type ? document.type : '',
      status: document.status,
      aadhaarimg: document.media.doc_front
        ? this.attachDocumentUrl(document.media.doc_front) +
          '---' +
          this.attachDocumentUrl(document.media.doc_back)
        : '',
      document_image: this.attachDocumentUrl(document.media.document),
      aiff_image: document.media.document
        ? this.attachDocumentUrlAppendName(document.media.document)
        : '',
      user_photo: this.attachDocumentUrl(document.media.user_photo)
    };

    return modifiedResponse;
  }
  attachDocumentUrlAppendName(documentUrl: string) {
    return (
      environment.mediaUrl +
      documentUrl.split('.')[0] +
      '---' +
      '.' +
      documentUrl.split('.')[1]
    );
  }

  attachDocumentUrl(documentUrl: string) {
    return environment.mediaUrl + documentUrl;
  }

  prepareModalData(status: string) {
    let data = {};
    let message = '';

    if (status === 'approved') {
      switch (this.member_type) {
        case 'player':
          message = 'Aadhaar details';
          break;
        case 'club':
          message = 'AIFF document details';
          break;
        case 'academy':
          message = 'document details';
          break;
      }
      data = {
        header: 'Approve',
        message: `Do you want to approve ${message} of ${this.documentDetails
          .player_name || this.documentDetails.name} ${this.member_type} ?`
      };
    } else if (status === 'disapproved') {
      data = {
        header: 'Disapprove',
        message: `Please specify a reason for disapproval`
      };
    }

    return data;
  }

  updateDocumentStatus(status: string) {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: this.prepareModalData(status)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = {
          remarks: status === 'disapproved' ? result : ' ',
          status: status,
          type: this.documentDetails.documents[0].type
        };

        this._documentVerficationService
          .updateDocumentStatus(this.user_id, this.member_type, data)
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
    this.dialog.open(VerificationPopupComponent, {
      width: '40%',
      autoFocus: false,
      data: { imageURL: event }
    });
  }
}
