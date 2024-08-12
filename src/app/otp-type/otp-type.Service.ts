import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  verificationType: (query: string) => `/verification-type/?${query}`
};

interface ResendFootPlayerInviteContext {
  email: string;
}

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
export class otpTypeService {
  constructor(private httpClient: HttpClient) {}

  verificationType(context: FindOtpContext): Observable<OtpResponseContext> {
    let query = '';
    if (context['email']) {
      query += 'email=' + context['email'];
    }
    if (context['mobile_number']) {
      query += '&mobile_number=' + context['mobile_number'];
    }
    if (context['email_select']) {
      query += '&email_select=' + context['email_select'];
      localStorage.setItem('isEmail', 'true');
      localStorage.removeItem('isMobile');
    }
    if (context['phone_select']) {
      query += '&phone_select=' + context['phone_select'];
      localStorage.setItem('isMobile', 'true');
      localStorage.removeItem('isEmail');
    }

    return this.httpClient.get<OtpResponseContext>(
      routes.verificationType(query)
    );
  }
}
