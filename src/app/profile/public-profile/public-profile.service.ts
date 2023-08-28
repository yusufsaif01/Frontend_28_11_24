import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getPublicProfileDetails: (params: string) =>
    `/member/public/profile/${params}`,
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

interface GetPublicProfileDetailsContext {
  user_id: string;
}
export interface GetPublicProfileDetailsResponseContext {
  status: string;
  message: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: { id: string; name: string };
    state: { id: string; name: string };
    avatar_url: string;
    position: {
      _id: string;
      name: string;
      id: string;
      priority: string;
    }[];

    district: { id: string; name: string };
    club_academy_details: {
      head_coach_name: string;
      head_coach_phone: string;
      head_coach_email: string;
    };
    dob: string;
    height: { feet: string; inches: string };
    institute: {
      school: string;
      college: string;
      university: string;
    };
    player_type: string;
    strong_foot: string;
    weak_foot: string;
    weight: string;
    bio: string;
    social_profiles: {
      facebook: string;
      youtube: string;
      twitter: string;
      instagram: string;
      linked_in: string;
    };
    association: string;
    association_other: string;
    associated_club_academy: string;
    former_club_academy: string;
    gender: string;
    member_type: string;
    profile_status: { status: string; remarks: string };
    is_followed: boolean;
    footmate_status: string;
    name: string;
    type: string;
    trophies: {
      _id: string;
      name: string;
      year: string;
      position: string;
      id: string;
    }[];
    top_signings: {
      _id: string;
      name: string;
    }[];
    contact_person: {
      _id: string;
      designation: string;
      name: string;
      email: string;
      mobile_number: string;
    }[];
    founded_in: string;
    league: string;
    league_other: string;
    mobile_number: string;
    short_name: string;
    address: {
      full_address: string;
      pincode: string;
    };
    stadium_name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PublicProfileService {
  constructor(private _httpClient: HttpClient) {}

  getPublicProfileDetails(
    context: GetPublicProfileDetailsContext
  ): Observable<GetPublicProfileDetailsResponseContext> {
    let params = '';
    if (context['user_id']) {
      params += context['user_id'];
    }
    return this._httpClient.get<GetPublicProfileDetailsResponseContext>(
      routes.getPublicProfileDetails(params)
    );
  }

  followUser(
    context: FollowUnfollowUserContext
  ): Observable<FollowUnfollowUserResponseContext> {
    return this._httpClient.patch<FollowUnfollowUserResponseContext>(
      routes.followUser(context),
      context
    );
  }

  unfollowUser(
    context: FollowUnfollowUserContext
  ): Observable<FollowUnfollowUserResponseContext> {
    return this._httpClient.patch<FollowUnfollowUserResponseContext>(
      routes.unfollowUser(context),
      context
    );
  }

  sendFootMate(context: SendFootMate): Observable<CommonResponseContext> {
    return this._httpClient.post<CommonResponseContext>(
      routes.sendFootMate(context),
      context
    );
  }
  cancelFootMate(context: CancelFootMate): Observable<CommonResponseContext> {
    return this._httpClient.patch<CommonResponseContext>(
      routes.cancelFootMate(context),
      context
    );
  }
}
