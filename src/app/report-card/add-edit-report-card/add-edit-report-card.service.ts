import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  editReportCard: () => '',
  getReportCard: () => ''
};

interface EditReportCardResponseContext {}

interface GetReportCardResponseContext {}

@Injectable({
  providedIn: 'root'
})
export class AddEditReportCardService {
  constructor(private _httpClient: HttpClient) {}

  editReportCard(context: any): Observable<EditReportCardResponseContext> {
    return this._httpClient.post<EditReportCardResponseContext>(
      routes.editReportCard(),
      context
    );
  }

  getReportCard(): Observable<GetReportCardResponseContext> {
    return this._httpClient.get<GetReportCardResponseContext>(
      routes.getReportCard()
    );
  }
}
