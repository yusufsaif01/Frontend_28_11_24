import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpParamEncoder } from '@app/shared/custom-http-param-encoder/custom-http-param-encoder.component';

const routes = {
  getFootPlayerList: (center_user_id: string) =>
    `/training-center/footplayers/${center_user_id}`,
  deleteFootplayer: (id: string) => `/footplayers/${id}`,
  findPlayer: (query: string) => `/footplayer/search${query}`,
  sendFootPlayerRequest: () => '/footplayer/request',
  markAttendance: () => '/mark-attendance'
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
interface MarkAttendanceContext {
  center_user_id: string;
  player_user_id: string;
  status: string;
  date: string;
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
  district?: string;
  strong_foot?: string;
  status?: string;
  ability?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FootPlayerService {
  constructor(private httpClient: HttpClient) {}

  getFootPlayerList(
    center_user_id: any
  ): Observable<GetFootPlayerListResponseContext> {
    console.log('inside getFootPlayerList serviceeee');
    return this.httpClient.get<GetFootPlayerListResponseContext>(
      routes.getFootPlayerList(center_user_id)
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

  markAttendanceBatch(
    attendanceData: MarkAttendanceContext[]
  ): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.markAttendance(), // Adjust the route if you have a specific endpoint for batch processing, e.g., `routes.markAttendanceBatch()`
      attendanceData // Send the entire array as the payload
    );
  }
}
