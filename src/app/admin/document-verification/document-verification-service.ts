import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getDocumentStatus: (id: string) => `/player/${id}/documents`
};

@Injectable({
  providedIn: 'root'
})
export class DocumentVerificationService {
  constructor(private httpClient: HttpClient) {}

  getDocumentStatus(id: string): Observable<any> {
    return this.httpClient.get<any>(routes.getDocumentStatus(id));
  }
}
