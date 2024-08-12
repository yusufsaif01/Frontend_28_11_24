import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpParamEncoder } from '@app/shared/custom-http-param-encoder/custom-http-param-encoder.component';

const routes = {
  deleteTraningCenter: (id: string) => `/traning-center/${id}`,
  verifyOtp: (query: string) => `/otp/verify/?${query}`,
  reSendOtp: (query: string) => `/resendOtp/?${query}`
};

interface ResendFootPlayerInviteContext {
  email: string;
}

interface FindOtpContext {
  name: string;
  email: string;
  otp: string;
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
export class PhoneOtpService {
  constructor(private httpClient: HttpClient) {}

  deleteTraningCenter(id: string) {
    return this.httpClient.delete<any>(routes.deleteTraningCenter(id));
  }

  verifyOtp(context: FindOtpContext): Observable<OtpResponseContext> {
    let query = '';
    if (context['email']) {
      query += 'email=' + context['email'];
    }
    if (context['otp']) {
      query += '&otp=' + context['otp'];
    }
    if (context['name']) {
      query += '&name=' + context['name'];
    }
    console.log(
      'return of this.httpClient',
      this.httpClient.get<OtpResponseContext>(routes.verifyOtp(query))
    );
    return this.httpClient.get<OtpResponseContext>(routes.verifyOtp(query));
  }

  reSendOtp(context: FindOtpContext): Observable<OtpResponseContext> {
    let query = '';
    if (context['email']) {
      query += 'email=' + context['email'];
    }
    if (context['otp']) {
      query += '&otp=' + context['otp'];
    }
    if (context['name']) {
      query += '&name=' + context['name'];
    }
    return this.httpClient.get<OtpResponseContext>(routes.reSendOtp(query));
  }
}
