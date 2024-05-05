import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpParamEncoder } from '@app/shared/custom-http-param-encoder/custom-http-param-encoder.component';

const routes = {
  traningCenterList: (user_id: any, c: CommonContext) =>
    `/traning/center_list/${user_id}`,
  deleteTraningCenter: (id: string) => `/traning-center/${id}`,
  findPlayer: (query: string) => `/footplayer/search${query}`,
  sendFootPlayerRequest: () => '/footplayer/request',
  sendFootPlayerInvite: () => '/footplayer/invite',
  resendFootPlayerInvite: () => `/footplayer/resend-invite`
};

interface ResendFootPlayerInviteContext {
  email: string;
}

interface CommonContext {
  page_no?: number;
  page_size?: number;
}
interface SendFootPlayerInviteContext {
  name?: string;
  phone?: string;
  email: string;
}

interface CommonResponseContext {
  status: string;
  message: string;
}

interface sendFootPlayerRequestContext {
  to: string;
}
interface FindPlayerContext {
  name: string;
  email: string;
  phone: string;
}
interface FindPlayerResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      user_id: string;
      avatar: string;
      name: string;
      member_type: string;
      category: string;
      position: string;
      is_verified: boolean;
      club_name: string;
      email: string;
      status: string;
    }[];
  };
}

interface GetTraningCenterListResponseContext {
  data: {
    total: number;
    records: {
      id: string;
      coache_name: string;
      end_time: string;
      start_time: string;
      center_name: string;
      opening_days: string;
      status: string;
    }[];
  };
}

interface GetTraningCenterListContext {
  center_name?: string;
  start_time?: number;
  end_time?: number;
  coache_name?: number;
  opening_days?: string;
  status?: string;
  id?: {};
}

@Injectable({
  providedIn: 'root'
})
export class TraningCenterService {
  constructor(private httpClient: HttpClient) {}

  traningCenterList(
    user_id: string,
    context: CommonContext
  ): Observable<GetTraningCenterListResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    return this.httpClient.get<GetTraningCenterListResponseContext>(
      routes.traningCenterList(user_id, context) + query
    );
  }

  deleteTraningCenter(id: string) {
    return this.httpClient.delete<any>(routes.deleteTraningCenter(id));
  }

  findPlayer(
    context: FindPlayerContext
  ): Observable<FindPlayerResponseContext> {
    let query = '?';
    if (context['email']) {
      query += 'email=' + context['email'];
    }
    if (context['phone']) {
      query += '&phone=' + context['phone'];
    }
    if (context['name']) {
      query += '&name=' + context['name'];
    }
    return this.httpClient.get<FindPlayerResponseContext>(
      routes.findPlayer(query)
    );
  }

  sendFootPlayerRequest(
    context: sendFootPlayerRequestContext
  ): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.sendFootPlayerRequest(),
      context
    );
  }

  sendFootPlayerInvite(
    context: SendFootPlayerInviteContext
  ): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.sendFootPlayerInvite(),
      context
    );
  }

  resendFootPlayerInvite(
    context: ResendFootPlayerInviteContext
  ): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.resendFootPlayerInvite(),
      context
    );
  }
}
