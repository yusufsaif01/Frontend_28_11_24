import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getPositionList: () => '/master/player-specialization/position/list'
};

@Injectable({
  providedIn: 'root'
})
export class ViewEditProfileService {
  constructor(private httpClient: HttpClient) {}

  getPositionList(): Observable<any> {
    return this.httpClient.get<any>(routes.getPositionList());
  }
}
