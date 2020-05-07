import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';

const routes = {
  followUser: (c: FollowUnfollowUserContext) => '/connection/follow',
  unfollowUser: (c: FollowUnfollowUserContext) => '/connection/unfollow'
};

interface FollowUnfollowUserContext {
  to: string;
}
interface FollowUnfollowUserResponseContext {
  status: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class LeftPanelService {
  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) {}

  followUser(
    context: FollowUnfollowUserContext
  ): Observable<FollowUnfollowUserResponseContext> {
    let token = this.credentialsService.isAuthenticated()
      ? this.credentialsService.credentials['data']['token']
      : '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.patch<FollowUnfollowUserResponseContext>(
      routes.followUser(context),
      context,
      httpOptions
    );
  }

  unfollowUser(
    context: FollowUnfollowUserContext
  ): Observable<FollowUnfollowUserResponseContext> {
    let token = this.credentialsService.isAuthenticated()
      ? this.credentialsService.credentials['data']['token']
      : '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    return this.httpClient.patch<FollowUnfollowUserResponseContext>(
      routes.unfollowUser(context),
      context,
      httpOptions
    );
  }
}
