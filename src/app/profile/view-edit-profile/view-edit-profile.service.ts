import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getPersonalProfileDetails: () => `/profile/personal_details`,
  getProfessionalProfileDetails: () => `/profile/professional_details`,
  updatePersonalProfileDetails: () => `/update-details/personal_details`,
  updateAvatar: () => `/update-avatar`,
  getEmploymentContractList: () => '/employment-contract/list',
  deleteContract: (id: string) => `/employment-contract/${id}`
};

@Injectable({
  providedIn: 'root'
})
export class ViewEditProfileService {
  constructor(private httpClient: HttpClient) {}

  getPersonalProfileDetails(): Observable<any> {
    return this.httpClient.get<any>(routes.getPersonalProfileDetails());
  }
  getProfessionalProfileDetails(): Observable<any> {
    return this.httpClient.get<any>(routes.getProfessionalProfileDetails());
  }
  updatePersonalProfileDetails(body: any): Observable<any> {
    return this.httpClient.put<any>(
      routes.updatePersonalProfileDetails(),
      body
    );
  }
  updateAvatar(body: any): Observable<any> {
    return this.httpClient.put(routes.updateAvatar(), body);
  }
  getEmploymentContractList(): Observable<any> {
    return this.httpClient.get<any>(routes.getEmploymentContractList());
  }
  deleteContract(id: string): Observable<any> {
    return this.httpClient.delete<any>(routes.deleteContract(id));
  }
}
