import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpParamEncoder } from '@app/shared/custom-http-param-encoder/custom-http-param-encoder.component';

const routes = {
  traningCenterList: (user_id: any, c: CommonContext) =>
    `/traning/center_list/${user_id}`,
  deleteTraningCenter: (id: string) => `/traning-center/${id}`,
  deleteFootplayer: (id: string) => `/footplayers/${id}`,
  findPlayer: (query: string) => `/footplayer/search${query}`,
  sendFootPlayerRequest: () => '/footplayer/request',
  sendFootPlayerInvite: () => '/footplayer/invite',
  resendFootPlayerInvite: () => `/footplayer/resend-invite`,
  assignTrainingCenter: (user_id: string) =>
    `/assign/training-center/${user_id}`,
  getPublicProfileDetails: (params: string) =>
    `/member/public/profile/${params}`,

  getPlayerAttendanceDetails: () => `/player/attendance`
};

interface ResendFootPlayerInviteContext {
  email: string;
}

interface CommonContext {
  page_no?: number;
  page_size?: number;
}
interface SendFootPlayerInviteContext {
  name?: string;
  phone?: string;
  email: string;
}

interface CommonResponseContext {
  status: string;
  message: string;
}

interface sendFootPlayerRequestContext {
  to: string;
}
interface FindPlayerContext {
  name: string;
  email: string;
  phone: string;
}
interface FindPlayerResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      user_id: string;
      avatar: string;
      name: string;
      member_type: string;
      category: string;
      position: string;
      is_verified: boolean;
      club_name: string;
      email: string;
      status: string;
    }[];
  };
}

interface GetTraningCenterListResponseContext {
  data: {
    total: number;
    records: {
      id: string;
      coache_name: string;
      end_time: string;
      start_time: string;
      center_name: string;
      opening_days: string;
      status: string;
      checked: Boolean;
    }[];
  };
}
interface GetPublicProfileDetailsContext {
  user_id: string;
  academy_user_id: string;
}
interface GetPublicProfileDetailsContext1 {
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
      head_coache_name: string;
      head_coache_phone: string;
      head_coache_email: string;
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
interface GetTraningCenterListContext {
  center_name?: string;
  start_time?: number;
  end_time?: number;
  coache_name?: number;
  opening_days?: string;
  status?: string;
  id?: {};
  checked: Boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AssignTraningCenterService {
  constructor(private httpClient: HttpClient) {}

  assignTrainingCenter(user_id: any, data: any): Observable<any> {
    console.log('userid  in service file is', user_id);
    console.log('data in service file is', data);

    return this.httpClient.post<any>(
      routes.assignTrainingCenter(user_id),
      data
    );
  }

  traningCenterList(
    user_id: string,
    context: CommonContext
  ): Observable<GetTraningCenterListResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    return this.httpClient.get<GetTraningCenterListResponseContext>(
      routes.traningCenterList(user_id, context) + query
    );
  }

  getPublicProfileDetails(
    context: GetPublicProfileDetailsContext1
  ): Observable<GetPublicProfileDetailsResponseContext> {
    let params = '';
    if (context['user_id']) {
      params += context['user_id'];
    }
    return this.httpClient.get<GetPublicProfileDetailsResponseContext>(
      routes.getPublicProfileDetails(params)
    );
  }

  getPlayerAttendanceDetails(
    context: GetPublicProfileDetailsContext
  ): Observable<GetPublicProfileDetailsResponseContext> {
    // Create a query parameter object
    const params = {
      user_id: context.user_id || '', // Default to empty string if undefined
      academy_user_id: context.academy_user_id || '' // Default to empty string if undefined
    };

    console.log('Service hit with params:', params);

    // Use HttpClient's `HttpParams` to encode the parameters properly
    const httpParams = new HttpParams({ fromObject: params });

    return this.httpClient.get<GetPublicProfileDetailsResponseContext>(
      routes.getPlayerAttendanceDetails(), // Pass the base route
      { params: httpParams } // Pass the HttpParams object here
    );
  }

  deleteTraningCenter(id: string) {
    return this.httpClient.delete<any>(routes.deleteTraningCenter(id));
  }
  deleteFootPlayer(id: string) {
    return this.httpClient.delete<any>(routes.deleteFootplayer(id));
  }
  findPlayer(context: FindPlayerContext): Observable<any> {
    let query = '?';
    if (context['email']) {
      query += 'email=' + context['email'];
    }
    if (context['phone']) {
      query += '&phone=' + context['phone'];
    }
    if (context['name']) {
      query += '&name=' + context['name'];
    }
    return this.httpClient.get<any>(routes.findPlayer(query));
  }

  sendFootPlayerRequest(
    context: sendFootPlayerRequestContext
  ): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.sendFootPlayerRequest(),
      context
    );
  }

  sendFootPlayerInvite(
    context: SendFootPlayerInviteContext
  ): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.sendFootPlayerInvite(),
      context
    );
  }

  resendFootPlayerInvite(
    context: ResendFootPlayerInviteContext
  ): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.resendFootPlayerInvite(),
      context
    );
  }
}
