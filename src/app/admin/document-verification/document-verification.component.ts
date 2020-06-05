import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentVerificationTableConfig } from './document-verification-table-conf';
import { ActivatedRoute } from '@angular/router';
import { DocumentVerificationService } from './document-verification-service';

@Component({
  selector: 'app-document-verification',
  templateUrl: './document-verification.component.html',
  styleUrls: ['./document-verification.component.scss']
})
export class DocumentVerificationComponent implements OnInit {
  public sideBarToggle: boolean = true;
  public tableConfig: DocumentVerificationTableConfig = new DocumentVerificationTableConfig();
  public dataSource = new MatTableDataSource([
    {
      serialNumber: 1,
      name: 'Rasik Lal',
      dob: '3 June 1990',
      addedon: '12 May 2020',
      aadhaarno: '9889-8998-8983',
      aadhaarimg: '',
      playerimg: '',
      status: '',
      action: ''
    }
  ]);
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
        // console.log(response);
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
}
