import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getDocumentStatus: (id: string) => `/player/${id}/documents`,
  updateStatus: (id: string) => `/player/${id}/documents/status`
};

@Injectable({
  providedIn: 'root'
})
export class DocumentVerificationService {
  constructor(private httpClient: HttpClient) {}

  updateStatus(id: string, data: any) {
    return this.httpClient.put<any>(routes.updateStatus(id), data);
  }

  getDocumentStatus(id: string): Observable<any> {
    return this.httpClient.get<any>(routes.getDocumentStatus(id));
  }
}
