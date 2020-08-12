import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomHttpParamEncoder } from '@app/shared/custom-http-param-encoder/custom-http-param-encoder.component';

const routes = {
  getReportCardList: (query: string) => `/manage/report-card/list?${query}`
};

export interface GetReportCardListContext {
  search?: string;
  page_no?: number;
  page_size?: number;
  player_category?: string;
  status?: string;
  from?: string;
  to?: string;
}
export interface GetReportCardListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      user_id: string;
      avatar: string;
      name: string;
      category: 'professional' | 'amateur' | 'grassroot';
      total_report_cards: number;
      published_at: string;
      status: 'published' | 'draft' | '';
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ManageReportCardService {
  constructor(private _httpClient: HttpClient) {}

  getReportCardList(
    context: GetReportCardListContext
  ): Observable<GetReportCardListResponseContext> {
    let httpParams = new HttpParams({ encoder: new CustomHttpParamEncoder() });
    Object.keys(context).forEach(key => {
      if (context[key]) httpParams = httpParams.append(key, context[key]);
    });
    return this._httpClient.get<GetReportCardListResponseContext>(
      routes.getReportCardList(httpParams.toString())
    );
  }
}
