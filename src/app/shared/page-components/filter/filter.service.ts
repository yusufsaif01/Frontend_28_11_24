import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const routes = {
  getPositionsList: () => `/master/player-specialization/position/list`
};

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private httpClient: HttpClient) {}

  getPositionsListing(): Observable<any> {
    return this.httpClient.get<any>(routes.getPositionsList());
  }
}
