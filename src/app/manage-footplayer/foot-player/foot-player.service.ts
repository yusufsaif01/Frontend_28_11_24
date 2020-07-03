import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpParamEncoder } from '@app/shared/custom-http-param-encoder/custom-http-param-encoder.component';

const routes = {
  getFootPlayerList: (query: string) => `/footplayers${query}`,
  deleteFootplayer: (id: string) => `/footplayers/${id}`,
  findPlayer: (query: string) => `/footplayer/search${query}`,
  sendFootPlayerRequest: () => '/footplayer/request',
  sendFootPlayerInvite: () => '/footplayer/invite',
  resendFootPlayerInvite: () => `/footplayer/resend-invite`
};

interface ResendFootPlayerInviteContext {
  email: string;
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
    }[];
  };
}

interface GetFootPlayerListResponseContext {
  status: string;
  message: string;
  data: {
    footplayers: number;
    total: number;
    records: {
      id: string;
      user_id: string;
      avatar: string;
      category: string;
      name: string;
      position: string;
      status: string;
    }[];
  };
}

interface GetFootPlayerListContext {
  search?: string;
  page_no?: number;
  page_size?: number;
  footplayers?: number;
  position?: string;
  player_category?: string;
  age?: string;
  country?: string;
  state?: string;
  city?: string;
  strong_foot?: string;
  status?: string;
  ability?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FootPlayerService {
  constructor(private httpClient: HttpClient) {}

  httpParams = new HttpParams({ encoder: new CustomHttpParamEncoder() });

  getFootPlayerList(
    context: GetFootPlayerListContext
  ): Observable<GetFootPlayerListResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    if (context['search']) {
      query += '&search=' + context['search'];
    }
    if (context['position']) {
      query += '&position=' + context['position'];
    }
    if (context['player_category']) {
      query += '&footplayer_category=' + context['player_category'];
    }
    if (context['age']) {
      query += '&age=' + context['age'];
    }
    if (context['country']) {
      query += '&country=' + context['country'];
    }
    if (context['state']) {
      query += '&state=' + context['state'];
    }
    if (context['city']) {
      query += '&city=' + context['city'];
    }
    if (context['strong_foot']) {
      query += '&strong_foot=' + context['strong_foot'];
    }
    if (context['status']) {
      query += '&status=' + context['status'];
    }
    if (context['ability']) {
      query += '&ability=' + context['ability'];
    }
    if (context['footplayers']) {
      query += '&footplayers=' + context['footplayers'];
    }

    // let encoder = new CustomHttpParamEncoder();
    // encoder.encodeValue(context);
    // let HttpParams : new HttpParams({});
    Object.keys(context).forEach(function(key) {
      this.httpParams = this.httpParams.append(key, context[key]);
    });

    return this.httpClient.get<GetFootPlayerListResponseContext>(
      routes.getFootPlayerList(query)
    );
  }
  deleteFootPlayer(id: string) {
    return this.httpClient.delete<any>(routes.deleteFootplayer(id));
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
