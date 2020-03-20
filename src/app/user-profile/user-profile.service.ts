import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  getUserProfile: () => `/user/me`,
  updateProfile: () => `/user/update-profile`
};

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  getUserProfile(data: any): Observable<any> {
    return this.httpClient.post(routes.getUserProfile(), data);
  }
  updateProfile(data: any): Observable<any> {
    return this.httpClient.patch(routes.updateProfile(), data);
  }
}
