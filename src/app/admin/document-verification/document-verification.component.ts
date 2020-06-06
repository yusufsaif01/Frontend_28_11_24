import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentVerificationTableConfig } from './document-verification-table-conf';
import { ActivatedRoute } from '@angular/router';
import { DocumentVerificationService } from './document-verification-service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { untilDestroyed } from '@app/core';
import { VerificationPopupComponent } from '@app/admin/verification-popup/verification-popup.component';

@Component({
  selector: 'app-document-verification',
  templateUrl: './document-verification.component.html',
  styleUrls: ['./document-verification.component.scss']
})
export class DocumentVerificationComponent implements OnInit {
  public sideBarToggle: boolean = true;
  public tableConfig: DocumentVerificationTableConfig = new DocumentVerificationTableConfig();
  public dataSource = new MatTableDataSource([]);
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
    });
  }

  ngOnInit() {
    this.getDocumentStatus();
  }

  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }

  getDocumentStatus() {
    this._documentVerficationService.getDocumentStatus(this.user_id).subscribe(
      response => {
        // console.log(response);
        this.responsePopulated = true;
        this.documentDetails = {
          player_name: 'Phillip J Coulson',
          date_of_birth: '2020-06-03',
          documents: [
            {
              type: 'aadhar',
              added_on: '2020-04-21T10:57:06.730Z',
              document_number: '1234567890987654',
              media: {
                attachment_type: 'image',
                doc_front:
                  'http://localhost:3000/uploads/documents/AOsI66k1591167860318.jpg',
                doc_back:
                  'http://localhost:3000/uploads/documents/AOsI66k1591167860318.jpg',
                user_photo:
                  'http://localhost:3000/uploads/documents/AOsI66k1591167860318.jpg',
                document:
                  'http://localhost:3000/uploads/documents/AOsI66k1591167860318.jpg'
              },
              status: 'pending'
            }
          ]
        };
        let modifiedResponse = this.responseModify(this.documentDetails);
        console.log(modifiedResponse);
        this.dataSource = new MatTableDataSource(modifiedResponse);
        // console.log(this.dataSource);
      },
      error => {
        console.log(error);
      }
    );
  }
  responseModify(documentDetails: any) {
    let modifiedResponse: any = {};
    modifiedResponse.added_on = documentDetails.documents[0].added_on;
    modifiedResponse.date_of_birth = documentDetails.date_of_birth;
    modifiedResponse.player_name = documentDetails.player_name;
    modifiedResponse.document_number =
      documentDetails.documents[0].document_number;
    modifiedResponse.status = documentDetails.documents[0].status;
    modifiedResponse.type = documentDetails.documents[0].type;
    modifiedResponse.attachment_type =
      documentDetails.documents[0].media.attachment_type;
    modifiedResponse.doc_back = documentDetails.documents[0].media.doc_back;
    modifiedResponse.doc_front = documentDetails.documents[0].media.doc_front;
    modifiedResponse.document = documentDetails.documents[0].media.document;
    modifiedResponse.user_photo = documentDetails.documents[0].media.user_photo;
    let responseArray: any[] = [];
    responseArray[0] = modifiedResponse;
    return responseArray;
  }

  approve(user_id: string) {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      width: '50% ',
      panelClass: 'filterDialog',
      data: {
        header: 'Approve',
        message: `Do you want to approve aadhaar details of ${this.documentDetails.player_name} player`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._documentVerficationService
          .updateStatus(user_id, { status: 'approved' })
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

  disApprove(user_id: string) {
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
          .updateStatus(user_id, { remarks: result, status: 'disapproved' })
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
}
