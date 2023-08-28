import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getDocumentsDetails: () => '/profile/document_details',
  editDocumentsDetails: () => '/update-details/document_details'
};

export interface GetDocumentsResponseDetails {
  status: string;
  message: string;
  data: {
    documents: {
      status: string;
      _id: string;
      type: 'aadhar';
      added_on: string;
      media: {
        attachment_type: 'pdf' | 'image';
        doc_front: string;
        doc_back: string;
        document: string;
        user_photo: string;
      };
      document_number: string;
      remark: string;
    }[];

    member_type: string;
    profile_status: {
      status: string;
      remarks: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  constructor(private _httpClient: HttpClient) {}

  getDocumentsDetails(): Observable<GetDocumentsResponseDetails> {
    return this._httpClient.get<GetDocumentsResponseDetails>(
      routes.getDocumentsDetails()
    );
  }

  editDocumentsDetails(context: any): Observable<any> {
    return this._httpClient.put(routes.editDocumentsDetails(), context);
  }
}
