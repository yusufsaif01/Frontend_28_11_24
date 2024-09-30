import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getPersonalProfileDetails: () => `/profile/personal_details`,
  getProfessionalProfileDetails: () => `/profile/professional_details`,
  updatePersonalProfileDetails: () => `/update-details/personal_details`,
  updateAvatar: () => `/update-avatar`,
  getEmploymentContractList: () => '/employment-contract/list',
  deleteContract: (id: string) => `/employment-contract/${id}`,
  getCoachRole: () => '/profile/getcoach/role',
  verifyEmailOrMobile: (id: string, dataToVerify: string) =>
    `/verifyIdentity/${id}/${dataToVerify}`,
  verifyOtp: (query: string) => `/otp-type/verification/?${query}`,
  deleteAccount: (user_id: string) => `/member/delete/${user_id}`
};

interface FindOtpContext {
  name: string;
  email: string;
  otp: string;
  mobile_number: string;
}
interface OtpResponseContext {
  status: string;
  message: string;
  data: {
    records: {
      otp_id: string;
    }[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class ViewEditProfileService {
  constructor(private httpClient: HttpClient) {}

  deleteAccount(user_id: string): Observable<any> {
    console.log('inside deleteAccount Service');
    console.log('user id is', user_id);
    console.log(this.httpClient.delete<any>(routes.deleteAccount(user_id)));
    return this.httpClient.get<any>(routes.deleteAccount(user_id));
  }
  deleteContract(id: string): Observable<any> {
    return this.httpClient.delete<any>(routes.deleteContract(id));
  }
  getPersonalProfileDetails(): Observable<any> {
    return this.httpClient.get<any>(routes.getPersonalProfileDetails());
  }
  getCoachRole(): Observable<any> {
    return this.httpClient.get<any>(routes.getCoachRole());
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

  verifyEmailOrMobile(id: string, dataToVerify: string): Observable<any> {
    return this.httpClient.get<any>(
      routes.verifyEmailOrMobile(id, dataToVerify)
    );
  }

  verifyOtp(context: FindOtpContext): Observable<OtpResponseContext> {
    let query = '';
    if (context['email']) {
      query += 'email=' + context['email'];
    }
    if (context['mobile_number']) {
      query += 'mobile_number=' + context['mobile_number'];
    }
    if (context['otp']) {
      query += '&otp=' + context['otp'];
    }
    if (context['name']) {
      query += '&name=' + context['name'];
    }
    return this.httpClient.get<OtpResponseContext>(routes.verifyOtp(query));
  }
}
