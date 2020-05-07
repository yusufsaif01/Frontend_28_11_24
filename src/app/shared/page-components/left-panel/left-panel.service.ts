import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(private httpClient: HttpClient) {}

  followUser(
    context: FollowUnfollowUserContext
  ): Observable<FollowUnfollowUserResponseContext> {
    return this.httpClient.patch<FollowUnfollowUserResponseContext>(
      routes.followUser(context),
      context
    );
  }

  unfollowUser(
    context: FollowUnfollowUserContext
  ): Observable<FollowUnfollowUserResponseContext> {
    return this.httpClient.patch<FollowUnfollowUserResponseContext>(
      routes.unfollowUser(context),
      context
    );
  }
}
