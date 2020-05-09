import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const routes = {
  getProfileDetails: () => '/profile',
  getPublicProfileDetails: () => '/profile'
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  getProfileDetails(): Observable<any> {
    return this.httpClient.get(routes.getProfileDetails());
  }

  getPublicProfileDetails(handleName: string): Observable<any> {
    return this.httpClient.get(routes.getPublicProfileDetails());
  }
}
