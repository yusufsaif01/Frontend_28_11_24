import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getMutualFootmateList: (id: any) => `/connection/mutuals/${id}`
};

@Injectable({
  providedIn: 'root'
})
export class MutualFootmateService {
  constructor(private httpClient: HttpClient) {}

  getMutualFootmateList(id: any): Observable<any> {
    return this.httpClient.get<any>(routes.getMutualFootmateList(id));
  }
}
