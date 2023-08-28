import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  followUser: (c: FollowUnfollowUserContext) => '/connection/follow',
  unfollowUser: (c: FollowUnfollowUserContext) => '/connection/unfollow',
  sendFootMate: (c: SendFootMate) => '/connection/request/send',
  cancelFootMate: (c: CancelFootMate) => '/connection/request/cancel'
};

interface FollowUnfollowUserContext {
  to: string;
}
interface FollowUnfollowUserResponseContext {
  status: string;
  message: string;
}
interface CommonResponseContext {
  status: string;
  message: string;
}

interface SendFootMate {
  to: string;
}
interface CancelFootMate {
  to: string;
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

  sendFootMate(context: SendFootMate): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.sendFootMate(context),
      context
    );
  }
  cancelFootMate(context: CancelFootMate): Observable<CommonResponseContext> {
    return this.httpClient.patch<CommonResponseContext>(
      routes.cancelFootMate(context),
      context
    );
  }
}
