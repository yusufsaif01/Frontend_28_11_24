import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// /connection/list?page_no=1&page_size=20&position=<positions>&player_category=<player_category>&age=<age_range>&country=<country>&city=<city>&state=<state>&strong_foot=<strong_foot>
const routes = {
  getFootMateList: (c: GetFootMateListContext) => '/connection/list',
  connectionStats: () => '/connection/stats'
};
interface GetFootMateListContext {
  page_no?: number;
  page_size?: number;
  position?: string;
  player_category?: string;
  age?: number;
  country?: string;
  state?: string;
  city?: string;
  strong_foot?: string;
}
interface GetFootMateListResponseContext {
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
      mutuals: number;
    }[];
  };
}
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
@Injectable({
  providedIn: 'root'
})
export class FootMatesService {
  constructor(private httpClient: HttpClient) {}

  getFootMateList(
    context: GetFootMateListContext
  ): Observable<GetFootMateListResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    return this.httpClient.get<GetFootMateListResponseContext>(
      routes.getFootMateList(context) + query
    );
  }
  connectionStats(): Observable<ConnectionStatsResponseContext> {
    return this.httpClient.get<ConnectionStatsResponseContext>(
      routes.connectionStats()
    );
  }
}
