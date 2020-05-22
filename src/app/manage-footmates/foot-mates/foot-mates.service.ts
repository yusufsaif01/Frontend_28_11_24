import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// /connection/list?page_no=1&page_size=20&position=<positions>&player_category=<player_category>&age=<age_range>&country=<country>&city=<city>&state=<state>&strong_foot=<strong_foot>
const routes = {
  getFootMateList: (c: GetFootMateListContext) => '/connection/list',
  getPositionsList: () => `/master/player-specialization/position/list`,
  getCitiesList: (countryID: any, stateID: any) =>
    `/master/city/list/${countryID}/${stateID}`,
  getStatesList: (countryID: any) => `/master/state/list/${countryID}`,
  getLocationStats: () => `/master/location/stats`
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
    if (context['position']) {
      query += '&position=' + context['position'];
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
    if (context['player_category']) {
      query += '&player_category=' + context['player_category'];
    }
    if (context['age']) {
      query += '&age=' + context['age'];
    }
    if (context['strong_foot']) {
      query += '&strong_foot=' + context['strong_foot'];
    }
    return this.httpClient.get<GetFootMateListResponseContext>(
      routes.getFootMateList(context) + query
    );
  }

  getPositionsListing(): Observable<any> {
    return this.httpClient.get<any>(routes.getPositionsList());
  }
}
