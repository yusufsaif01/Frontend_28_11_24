import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentVerificationTableConfig } from './document-verification-table-conf';
import { ActivatedRoute } from '@angular/router';
import { DocumentVerificationService } from './document-verification-service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-document-verification',
  templateUrl: './document-verification.component.html',
  styleUrls: ['./document-verification.component.scss']
})
export class DocumentVerificationComponent implements OnInit {
  public sideBarToggle: boolean = true;
  public tableConfig: DocumentVerificationTableConfig = new DocumentVerificationTableConfig();
  public dataSource = new MatTableDataSource([]);
  // [ / /Dummy response, commented for now
  //   {
  //     serialNumber: 1,
  //     name: 'Rasik Lal',
  //     dob: '3 June 1990',
  //     addedon: '12 May 2020',
  //     aadhaarno: '9889-8998-8983',
  //     aadhaarimg: '',
  //     playerimg: '',
  //     status: '',
  //     action: ''
  //   }
  // ]
  user_id: string;
  documentDetails: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _documentVerficationService: DocumentVerificationService
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
        this.documentDetails = response.data;
        let modifiedResponse = this.prepareResponse(this.documentDetails);
        this.dataSource = new MatTableDataSource(modifiedResponse);
      },
      error => {
        console.log(error);
      }
    );
  }

  prepareResponse(documentDetails: any) {
    let modifiedResponse: any = {
      added_on: documentDetails.documents[0].added_on,
      date_of_birth: documentDetails.date_of_birth,
      player_name: documentDetails.player_name,
      document_number: documentDetails.documents[0].document_number,
      status: documentDetails.documents[0].status,
      // type : documentDetails.documents[0].type,
      // attachment_type :      documentDetails.documents[0].media.attachment_type,
      aadhaarimg:
        environment.mediaUrl +
        documentDetails.documents[0].media.doc_front +
        '---' +
        environment.mediaUrl +
        documentDetails.documents[0].media.doc_back,
      document: documentDetails.documents[0].media.document,
      user_photo:
        environment.mediaUrl + documentDetails.documents[0].media.user_photo
    };
    let responseArray: any[] = [];
    responseArray[0] = modifiedResponse;
    return responseArray;
  }

  openDialog(event: string) {
    console.log(event);
  }
}
