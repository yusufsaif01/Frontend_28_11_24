import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getPlayerReportCardList: (params: string, query: string) =>
    `/manage/report-card/list/${params}?${query}`
};

interface GetPlayerReportCardListContext {
  player_id: string;
  page_no: number;
  page_size: number;
}

export interface GetPlayerReportCardListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    draft_id: string;
    player_name: string;
    records: {
      id: string;
      sent_by: string;
      published_at: string;
      created_by: string;
      status: 'published' | 'draft';
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class LinkReportCardService {
  constructor(private _httpClient: HttpClient) {}

  getPlayerReportCardList(
    context: GetPlayerReportCardListContext
  ): Observable<GetPlayerReportCardListResponseContext> {
    let query = '';
    let params = '';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    if (context['player_id']) {
      params += context['player_id'];
    }
    return this._httpClient.get<GetPlayerReportCardListResponseContext>(
      routes.getPlayerReportCardList(params, query)
    );
  }
}
