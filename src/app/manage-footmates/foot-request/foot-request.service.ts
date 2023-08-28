import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getFootRequestList: (c: GetFootRequestList) => '/connection/request/list',
  acceptFootRequest: (params: string) => `/connection/request/accept/${params}`,
  rejectFootRequest: (params: string) => `/connection/request/reject/${params}`,
  connectionStats: () => '/connection/stats',
  getFootPlayerRequestList: (query: string) => `/footplayer/requests${query}`,
  acceptFootPlayerRequest: (params: string) =>
    `/footplayer/request/accept/${params}`,
  rejectFootPlayerRequest: (params: string) =>
    `/footplayer/request/reject/${params}`
};

interface ConnectionStatsResponseContext {
  status: string;
  message: string;
  data: {
    footmate_requests: number;
    footmates: number;
    followers: number;
    followings: number;
    video_count: number;
    total_requests: number;
  };
}
interface ConnectionStatsRequestContext {
  user_id: string;
}
interface RequestContext {
  request_id: string;
  user_id: string;
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
interface GetFootPlayerRequestListContext {
  page_no?: number;
  page_size?: number;
  requested_by?: string;
}
interface GetFootPlayerRequestListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      user_id: string;
      avatar: string;
      name: string;
      member_type: string;
      sub_category: string;
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

  acceptRequest(
    context: Partial<RequestContext>
  ): Observable<CommonResponseContext> {
    let params = '';

    if (context['request_id']) {
      params += `${context['request_id']}`;
      return this.httpClient.patch<CommonResponseContext>(
        routes.acceptFootRequest(params),
        context
      );
    }
    if (context['user_id']) {
      params += context['user_id'];
      return this.httpClient.patch<CommonResponseContext>(
        routes.acceptFootPlayerRequest(params),
        context
      );
    }
  }

  rejectRequest(
    context: Partial<RequestContext>
  ): Observable<CommonResponseContext> {
    let params = '';

    if (context['request_id']) {
      params += `${context['request_id']}`;
      return this.httpClient.patch<CommonResponseContext>(
        routes.rejectFootRequest(params),
        context
      );
    }
    if (context['user_id']) {
      params += context['user_id'];
      return this.httpClient.patch<CommonResponseContext>(
        routes.rejectFootPlayerRequest(params),
        context
      );
    }
  }

  connectionStats(
    context: Partial<ConnectionStatsRequestContext>
  ): Observable<ConnectionStatsResponseContext> {
    let query = '?';
    if (context['user_id']) {
      query += 'user_id=' + context['user_id'];
      return this.httpClient.get<ConnectionStatsResponseContext>(
        routes.connectionStats() + query
      );
    }

    return this.httpClient.get<ConnectionStatsResponseContext>(
      routes.connectionStats()
    );
  }

  getFootPlayerRequestList(
    context: GetFootPlayerRequestListContext
  ): Observable<GetFootPlayerRequestListResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    if (context['requested_by']) {
      query += '&requested_by=' + context['requested_by'];
    }
    return this.httpClient.get<GetFootPlayerRequestListResponseContext>(
      routes.getFootPlayerRequestList(query)
    );
  }
}
