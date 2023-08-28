import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';

const routes = {
  updatePosition: (id: any) =>
    `/admin/master/player-specialization/position/${id}`,
  getPositionList: () => `/admin/master/player-specialization/position/list`,
  getAbilitiesList: () => `/admin/master/player-specialization/ability/list`,
  addPosition: () => `/admin/master/player-specialization/position/add`
};

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  constructor(private httpClient: HttpClient) {}

  updatePosition(id: any, data: any): Observable<any> {
    return this.httpClient.put<any>(routes.updatePosition(id), data);
  }
  getAbilitiesList() {
    return this.httpClient.get<any>(routes.getAbilitiesList());
  }
  getPositionList(filter: any = {}) {
    let query = '?';
    if (filter['page_no']) {
      query += 'page_no=' + filter['page_no'];
    }
    if (filter['page_size']) {
      query += '&page_size=' + filter['page_size'];
    }
    return this.httpClient.get<any>(routes.getPositionList() + query);
  }
  addPosition(data: any) {
    return this.httpClient.post<any>(routes.addPosition(), data);
  }
}
