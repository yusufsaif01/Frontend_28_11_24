import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

const routes = {
  getDistrictList: (countryID: any, stateID: any) =>
    `/master/district/list/${countryID}/${stateID}`,
  getStatesList: (countryID: any) => `/master/state/list/${countryID}`,
  getLocationStats: () => `/master/location/stats`,
  getCoacheList: (id: any) => `/coache/list/${id}`,
  getAbilityAttributeList: () =>
    '/master/player-specialization/ability-attribute/list'
};

export interface GetAbilityAttributeListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      id: string;
      name: string;
      attributes: {
        id: string;
        name: string;
      }[];
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  displayFilterSubject = new Subject<boolean>();
  videoRequest = new BehaviorSubject('');
  sharedMessage = this.videoRequest.asObservable();

  constructor(private httpClient: HttpClient) {}

  getDistrictsList(
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
      routes.getDistrictList(countryID, stateID) + query
    );
  }

  getStatesListing(countryID: string): Observable<any> {
    return this.httpClient.get<any>(routes.getStatesList(countryID));
  }

  getLocationStats(): Observable<any> {
    return this.httpClient.get<any>(routes.getLocationStats());
  }

  getCoacheList(id: any): Observable<any> {
    console.log('iddd recived is ==>');
    console.log(id);
    return this.httpClient.get<any>(routes.getCoacheList(id));
  }

  setFilterDisplayValue(value: boolean) {
    this.displayFilterSubject.next(value);
  }

  getFilterDisplayValue(): Subject<boolean> {
    return this.displayFilterSubject;
  }

  setVideoRequest(data: any) {
    this.videoRequest.next(data);
  }

  getAbilityAttributeList(): Observable<
    GetAbilityAttributeListResponseContext
  > {
    return this.httpClient.get<GetAbilityAttributeListResponseContext>(
      routes.getAbilityAttributeList()
    );
  }
}
