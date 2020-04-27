import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';

const routes = {
  updatePosition: (id: any) => `/master/player-specialization/position/${id}`,
  getPositionList: () => `/master/player-specialization/position/list`,
  getAbilitiesList: () => `/master/player-specialization/ability/list`,
  addPosition: () => `/master/player-specialization/position/add`
};

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) {}

  updatePosition(id: any, data: any): Observable<any> {
    let token = this.credentialsService.isAuthenticated()
      ? this.credentialsService.credentials['data']['token']
      : '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.put<any>(
      routes.updatePosition(id),
      data,
      httpOptions
    );
  }
  getAbilitiesList() {
    let token = this.credentialsService.isAuthenticated()
      ? this.credentialsService.credentials['data']['token']
      : '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.get<any>(routes.getAbilitiesList(), httpOptions);
  }
  getPositionList(filter: any = {}) {
    let token = this.credentialsService.isAuthenticated()
      ? this.credentialsService.credentials['data']['token']
      : '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    let query = '?';
    if (filter['page_no']) {
      query += 'page_no=' + filter['page_no'];
    }
    if (filter['page_size']) {
      query += '&page_size=' + filter['page_size'];
    }
    return this.httpClient.get<any>(
      routes.getPositionList() + query,
      httpOptions
    );
  }
  addPosition(data: any) {
    let token = this.credentialsService.isAuthenticated()
      ? this.credentialsService.credentials['data']['token']
      : '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.post<any>(routes.addPosition(), data, httpOptions);
  }
}
