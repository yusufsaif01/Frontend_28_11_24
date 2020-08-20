import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getProfessionalDetails: () => '/profile/professional_details',
  editProfessionalDetails: () => '/update-details/professional_details',
  getPositionList: () => '/master/player-specialization/position/list'
};

export interface GetPositionListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      id: string;
      name: string;
      abbreviation: string;
      abilities: {
        id: string;
        name: string;
      }[];
    }[];
  };
}

export interface GetProfessionalDetailsResponseContext {
  status: string;
  message: string;
  data: {
    position: {
      _id: string;
      name: string;
      id: string;
      priority: string;
    }[];
    player_type: string;
    associated_club_academy: string;
    club_academy_details: {
      head_coach_name: string;
      head_coach_phone: string;
      head_coach_email: string;
    };
    strong_foot: string;
    weak_foot: string;
    former_club_academy: string;
    member_type: string;
    trophies: {
      _id: string;
      name: string;
      year: string;
      position: string;
      id: string;
    }[];
    contact_person: {
      _id: string;
      designation: string;
      name: string;
      email: string;
      mobile_number: string;
    }[];
    top_players: { name: string }[];
    top_signings: { _id: string; name: string }[];
    league: string;
    league_other: string;
    type: string;
    association: string;
    association_other: string;
    profile_status: {
      status: string;
      remarks: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProfessionalDetailsService {
  constructor(private _httpClient: HttpClient) {}

  getProfessionalDetails(): Observable<GetProfessionalDetailsResponseContext> {
    return this._httpClient.get<GetProfessionalDetailsResponseContext>(
      routes.getProfessionalDetails()
    );
  }

  editProfessionalDetails(context: any): Observable<any> {
    return this._httpClient.put(routes.editProfessionalDetails(), context);
  }

  getPositionList(): Observable<GetPositionListResponseContext> {
    return this._httpClient.get<GetPositionListResponseContext>(
      routes.getPositionList()
    );
  }
}
