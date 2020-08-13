import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentVerificationTableConfig } from './document-verification-table-conf';
import { ContractListAdminTableConfig } from './contract-verification-admin-table-conf';
import { ActivatedRoute } from '@angular/router';
import { DocumentVerificationService } from './document-verification-service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { untilDestroyed } from '@app/core';
import { VerificationPopupComponent } from '@app/shared/dialog-box/verification-popup/verification-popup.component';
import { environment } from '@env/environment';

interface ResponseContext {
  added_on: string;
  date_of_birth: string;
  name: string;
  player_name: any;
  document_type: string;
  document_image: any;
  document_number: string;
  status: string;
  aadhaarimg: any;
  document: string;
  user_photo: string;
  aiff_id: string;
  aiff_image: any;
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

  public contractTableConfig: ContractListAdminTableConfig;
  public contractDataSource = new MatTableDataSource([]);

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
      this.contractTableConfig = new ContractListAdminTableConfig();
    });
  }

  ngOnInit() {
    this.getDocumentStatus();
    this.getEmploymentContractList();
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
      player_name: data.player_name ? { name: data.player_name } : '',
      name: data.name ? data.name : '',
      date_of_birth: data.date_of_birth ? data.date_of_birth : '',
      added_on: document.added_on,
      document_number: document.document_number ? document.document_number : '',
      aiff_id: document.document_number ? document.document_number : '',
      document_type: document.type ? document.type : '',
      status: document.status,
      aadhaarimg: {
        doc_front: document.media.doc_front
          ? this.attachDocumentUrl(document.media.doc_front)
          : '',
        doc_back: document.media.doc_back
          ? this.attachDocumentUrl(document.media.doc_back)
          : '',
        document: document.media.document
          ? this.attachDocumentUrl(document.media.document)
          : ''
      },
      document_image: {
        document: this.attachDocumentUrl(document.media.document),
        attachment_type: document.media.attachment_type
      },
      aiff_image: {
        document: this.attachDocumentUrl(document.media.document),
        attachment_type: document.media.attachment_type
      },
      user_photo: this.attachDocumentUrl(document.media.user_photo)
    };

    return modifiedResponse;
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

  getEmploymentContractList() {
    this._documentVerficationService
      .getEmploymentContractList(this.user_id)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          let modifiedResponse: any = this.prepareContractResponse(records);
          this.contractDataSource = new MatTableDataSource(modifiedResponse);
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }
  prepareContractResponse(records: any) {
    records.forEach((element: any) => {
      if (element.can_update_status) {
        element.club_academy_name = { name: element.name };
      } else {
        element.club_academy_name = {
          name: element.name,
          profileUrl:
            environment.mediaUrl +
            '/member/profile/view/' +
            element.club_academy_user_id
        };
      }
    });
    return records;
  }

  updateContractStatus(status: string, id: string, playerName: string) {
    let message: string = '';
    let header: string = '';
    let disApprove: boolean = false;
    if (status === 'disapproved') {
      header = 'Please confirm';
      message = 'Please specify a reason for disapproval';
      disApprove = true;
    }
    if (status === 'approved') {
      (header = 'Please confirm'),
        (message = `Do you want to approve the Employment Contract of ${playerName} player ?`);
      disApprove = false;
    }
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      width: '50%',
      data: {
        header: header,
        message: message,
        disApprove: disApprove
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        let data = {
          remarks: status === 'disapproved' ? result : ' ',
          status: status
        };
        this._documentVerficationService
          .updateContractStatus(id, data)
          .subscribe(
            (response: any) => {
              this.getEmploymentContractList();
              this._toastrService.success(
                'Success',
                'Status updated successfully'
              );
            },
            (error: any) => {
              this._toastrService.error(error.error.message, 'Error');
            }
          );
      }
    });
  }
}
