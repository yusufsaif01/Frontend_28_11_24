import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const routes = {
  getDistrictList: (countryID: any, stateID: any) =>
    `/master/district/list/${countryID}/${stateID}`,
  getStatesList: (countryID: any) => `/master/state/list/${countryID}`,
  getLocationStats: () => `/master/location/stats`,
  getAbilityList: () => '/admin/master/player-specialization/ability/list',
  getAttributeListByAbility: (c: GetAttributeListContext) =>
    '/master/player-specialization/attribute/list'
};

interface GetAttributeListContext {
  ability_id: string;
}
interface GetAbilityListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      id: string;
      name: string;
    }[];
  };
}

interface GetAttributeListResponseContext {
  status: string;
  message: string;
  data: {
    ability: string;
    total: number;
    records: {
      id: string;
      name: string;
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  displayFilterSubject = new Subject<boolean>();
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

  setFilterDisplayValue(value: boolean) {
    this.displayFilterSubject.next(value);
  }

  getFilterDisplayValue(): Subject<boolean> {
    return this.displayFilterSubject;
  }

  getAbilityList(): Observable<GetAbilityListResponseContext> {
    return this.httpClient.get<GetAbilityListResponseContext>(
      routes.getAbilityList()
    );
  }

  getAttributeListByAbility(
    context: GetAttributeListContext
  ): Observable<GetAttributeListResponseContext> {
    let params = '/';
    if (context['ability_id']) {
      params += `${context['ability_id']}`;
    }
    return this.httpClient.get<GetAttributeListResponseContext>(
      routes.getAttributeListByAbility(context) + params
    );
  }
}
