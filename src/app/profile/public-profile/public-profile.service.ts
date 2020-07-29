import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getPublicProfileDetails: (params: string) =>
    `/member/public/profile/${params}`
};

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

    city: { id: string; name: string };
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
}
