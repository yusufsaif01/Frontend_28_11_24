import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getPersonalProfileDetails: () => `/profile/personal_details`,
  updatePersonalProfileDetails: () => `/update-details/personal_details`
};

@Injectable({
  providedIn: 'root'
})
export class ViewEditProfileService {
  constructor(private httpClient: HttpClient) {}

  getPersonalProfileDetails(): Observable<any> {
    return this.httpClient.get<any>(routes.getPersonalProfileDetails());
  }
  updatePersonalProfileDetails(body: any): Observable<any> {
    return this.httpClient.put<any>(
      routes.updatePersonalProfileDetails(),
      body
    );
  }
}
