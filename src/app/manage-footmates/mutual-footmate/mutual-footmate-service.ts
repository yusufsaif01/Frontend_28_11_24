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

  getMutualFootmateList(id: any, context: any): Observable<any> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    return this.httpClient.get<any>(routes.getMutualFootmateList(id) + query);
  }
}
