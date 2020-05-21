import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getCitiesList: (countryID: any, stateID: any) =>
    `/master/city/list/${countryID}/${stateID}`,
  getStatesList: (countryID: any) => `/master/state/list/${countryID}`,
  getLocationStats: () => `/master/location/stats`
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private httpClient: HttpClient) {}

  getCitiesListing(
    countryID: string,
    stateID: string,
    context: any = {}
  ): Observable<any> {
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
    return this.httpClient.get<any>(
      routes.getCitiesList(countryID, stateID) + query
    );
  }

  getStatesListing(countryID: string): Observable<any> {
    return this.httpClient.get<any>(routes.getStatesList(countryID));
  }

  getLocationStats(): Observable<any> {
    return this.httpClient.get<any>(routes.getLocationStats());
  }
}
