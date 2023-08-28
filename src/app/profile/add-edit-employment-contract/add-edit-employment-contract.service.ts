import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  addContract: () => '/employment-contract',
  getClubAcademyList: (query: string) => `/people/list${query}`,
  getPlayerDetails: (params: string) => `/people/${params}`,
  getContract: (params: string) => `/employment-contract/${params}`,
  updateContract: (params: string) => `/employment-contract/${params}`
};

interface GetContractContext {
  contract_id: string;
}

interface GetPlayerDetailContext {
  user_id: string;
}
interface UpdateContractContext {
  contract_id: string;
  requestData: FormData;
}

interface GetContractResponseContext {
  status: string;
  message: string;
  data: {
    category: string;
    player_name: string;
    club_academy_name: string;
    signing_date: string;
    effective_date: string;
    expiry_date: string;
    place_of_signature: string;
    club_academy_representative_name: string;
    club_academy_address: string;
    club_academy_phone_number: string;
    club_academy_email: string;
    aiff_number: string;
    crs_user_name: string;
    legal_guardian_name: string;
    player_address: string;
    player_mobile_number: string;
    player_email: string;
    club_academy_uses_agent_services: boolean;
    club_academy_intermediary_name: string;
    club_academy_transfer_fee: string;
    player_uses_agent_services: boolean;
    player_intermediary_name: string;
    player_transfer_fee: string;
    status: string;
    other_name: string;
    other_email: string;
    other_phone_number: string;
    sent_by: string;
    send_to: string;
    id: string;
    created_by: string;
  };
}

interface GetClubAcademyListContext {
  role: string;
}

interface GetClubAcademyListResponseContext {
  status: string;
  message: string;
  data: {
    name: string;
    email: string;
    address: string;
    mobile: string;
    aiff_number: string;
    user_id: string;
  }[];
}

interface addContractResponseContext {
  data: { id: string };
  status: string;
  message: string;
}

interface CommonResponseContext {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddEditEmploymentContractService {
  constructor(private httpClient: HttpClient) {}

  addContract(context: FormData): Observable<addContractResponseContext> {
    return this.httpClient.post<addContractResponseContext>(
      routes.addContract(),
      context
    );
  }

  getClubAcademyList(
    context: GetClubAcademyListContext
  ): Observable<GetClubAcademyListResponseContext> {
    let query = '?';

    if (context['role']) {
      query += 'role=' + context['role'];
    }
    return this.httpClient.get<GetClubAcademyListResponseContext>(
      routes.getClubAcademyList(query)
    );
  }

  getContract(
    context: GetContractContext
  ): Observable<GetContractResponseContext> {
    let params = '';
    if (context['contract_id']) {
      params += context['contract_id'];
    }

    return this.httpClient.get<GetContractResponseContext>(
      routes.getContract(params)
    );
  }

  getPlayerDetails(
    context: GetPlayerDetailContext
  ): Observable<GetContractResponseContext> {
    let params = '';
    if (context['user_id']) {
      params += context['user_id'];
    }

    return this.httpClient.get<GetContractResponseContext>(
      routes.getPlayerDetails(params)
    );
  }

  updateContract(
    context: UpdateContractContext
  ): Observable<CommonResponseContext> {
    let params = '';
    if (context['contract_id']) {
      params += context['contract_id'];
    }

    return this.httpClient.put<CommonResponseContext>(
      routes.updateContract(params),
      context.requestData
    );
  }
}
