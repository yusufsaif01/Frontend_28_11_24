import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const routes = {
  getReportCardList: () => ''
};

export interface GetReportCardListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      name: string;
      category: string;
      published_date: string;
      created_by: string;
      no_of_report_card: number;
      status: 'published' | 'draft';
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ManageReportCardService {
  constructor(private _httpClient: HttpClient) {}

  getReportCardList(): Observable<GetReportCardListResponseContext> {
    return this._httpClient.get<GetReportCardListResponseContext>(
      routes.getReportCardList()
    );
  }
}
