import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpParamEncoder } from '@app/shared/custom-http-param-encoder/custom-http-param-encoder.component';
// /connection/list?page_no=1&page_size=20&position=<positions>&player_category=<player_category>&age=<age_range>&country=<country>&district=<district>&state=<state>&strong_foot=<strong_foot>
const routes = {
  getFootMateList: (query: string) => `/connection/list?${query}`,
  getPositionsList: () => `/master/player-specialization/position/list`,
  getDistrictsList: (countryID: any, stateID: any) =>
    `/master/district/list/${countryID}/${stateID}`,
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
  district?: string;
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
    let httpParams = new HttpParams({ encoder: new CustomHttpParamEncoder() });
    Object.keys(context).forEach(key => {
      if (context[key]) httpParams = httpParams.append(key, context[key]);
    });
    return this.httpClient.get<GetFootMateListResponseContext>(
      routes.getFootMateList(httpParams.toString())
    );
  }

  getPositionsListing(): Observable<any> {
    return this.httpClient.get<any>(routes.getPositionsList());
  }
}
