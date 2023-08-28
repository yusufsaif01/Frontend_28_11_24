import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  createReportCard: () => '/report-card',
  editReportCard: (params: string) => `/report-card/${params}`,
  getReportCard: (params: string) => `/report-card/view/${params}`
};

interface CommonResponseContext {
  status: string;
  message: string;
}

interface EditReportCardResponseContext {}

export interface GetReportCardResponseContext {
  status: string;
  message: string;
  data: {
    send_to: string;
    abilities: {
      _id: string;
      ability_id: string;
      ability_name: string;
      attributes: {
        _id: string;
        attribute_id: string;
        attribute_name: string;
        attribute_score: number;
      }[];
    }[];

    remarks: string;
    status: 'published' | 'draft';
    published_at: string;
    sent_by: string;
    id: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AddEditReportCardService {
  constructor(private _httpClient: HttpClient) {}

  createReportCard(context: any): Observable<CommonResponseContext> {
    return this._httpClient.post<CommonResponseContext>(
      routes.createReportCard(),
      context
    );
  }

  editReportCard(context: {
    report_card_id: string;
    requestData: FormData;
  }): Observable<EditReportCardResponseContext> {
    let params = '';
    if (context['report_card_id']) {
      params += context['report_card_id'];
    }
    return this._httpClient.put<EditReportCardResponseContext>(
      routes.editReportCard(params),
      context.requestData
    );
  }

  getReportCard(context: {
    report_card_id: string;
  }): Observable<GetReportCardResponseContext> {
    let params = '';
    if (context['report_card_id']) {
      params += context['report_card_id'];
    }
    return this._httpClient.get<GetReportCardResponseContext>(
      routes.getReportCard(params)
    );
  }
}
