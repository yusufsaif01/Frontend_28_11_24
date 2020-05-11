import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const routes = {
  getProfileDetails: () => '/profile',
  getPublicProfileDetails: () => '/member/public/profile'
};
interface GetPublicProfileContext {
  user_id: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  getProfileDetails(
    context: Partial<GetPublicProfileContext>
  ): Observable<any> {
    let params = '/';
    if (context['user_id']) {
      params += `${context['user_id']}`;
      return this.httpClient.get<GetPublicProfileContext>(
        routes.getPublicProfileDetails() + params
      );
    }

    return this.httpClient.get(routes.getProfileDetails());
  }
}
