import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  updateWhiteListUser: (id: any) => `/admin/access-whitelist/${id}`,
  updateStatus: (id: any) => `/admin/access-whitelist/${id}/status`,
  getWhiteList: () => `/admin/access-whitelist`,
  whiteListUser: () => `/admin/access-whitelist`
};

@Injectable({
  providedIn: 'root'
})
export class ManagePrivacyService {
  constructor(private httpClient: HttpClient) {}

  updateWhiteListUser(id: any, data: any): Observable<any> {
    return this.httpClient.put<any>(routes.updateWhiteListUser(id), data);
  }
  updateStatus(id: any, data: any): Observable<any> {
    return this.httpClient.put<any>(routes.updateStatus(id), data);
  }
  whiteListUser(data: any): Observable<any> {
    return this.httpClient.post<any>(routes.whiteListUser(), data);
  }
  getWhiteList() {
    return this.httpClient.get<any>(routes.getWhiteList());
  }
}
