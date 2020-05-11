import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// /connection/request/accept/:request_id
// /connection/request/reject/:request_id
const routes = {
  getFootRequestList: (c: GetFootRequestList) => '/connection/request/list',
  acceptFootRequest: (c: AcceptFootRequest) => '/connection/request/accept',
  rejectFootRequest: (c: RejectFootRequest) => '/connection/request/reject',
  connectionStats: () => '/connection/stats'
};

interface ConnectionStatsResponseContext {
  status: string;
  message: string;
  data: {
    footmate_requests: number;
    footmates: number;
    followers: number;
    followings: number;
  };
}

interface AcceptFootRequest {
  request_id: string;
}

interface RejectFootRequest {
  request_id: string;
}

interface GetFootRequestList {
  page_no?: number;
  page_size?: number;
}

interface GetFootRequestListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      name: string;
      position: string;
      player_type: string;
      avatar: string;
      user_id: string;
      request_id: string;
      mutuals: number;
    }[];
  };
}

interface CommonResponseContext {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class FootRequestService {
  constructor(private httpClient: HttpClient) {}

  getFootRequestList(
    context: GetFootRequestList
  ): Observable<GetFootRequestListResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    return this.httpClient.get<GetFootRequestListResponseContext>(
      routes.getFootRequestList(context) + query
    );
  }

  acceptFootRequest(
    context: AcceptFootRequest
  ): Observable<CommonResponseContext> {
    let params = '/';
    if (context['request_id']) {
      params += `${context['request_id']}`;
    }
    return this.httpClient.patch<CommonResponseContext>(
      routes.acceptFootRequest(context) + params,
      context
    );
  }
  rejectFootRequest(
    context: RejectFootRequest
  ): Observable<CommonResponseContext> {
    let params = '/';
    if (context['request_id']) {
      params += `${context['request_id']}`;
    }
    return this.httpClient.patch<CommonResponseContext>(
      routes.rejectFootRequest(context) + params,
      context
    );
  }
  connectionStats(): Observable<ConnectionStatsResponseContext> {
    return this.httpClient.get<ConnectionStatsResponseContext>(
      routes.connectionStats()
    );
  }
}
