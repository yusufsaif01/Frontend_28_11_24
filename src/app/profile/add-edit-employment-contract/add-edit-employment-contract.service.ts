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
interface UpdateContractContext {
  contract_id: string;
  requestData: FormData;
}

interface GetContractResponseContext {
  status: string;
  message: string;
  data: {
    category: string;
    playerName: string;
    clubAcademyName: string;
    signingDate: string;
    effectiveDate: string;
    expiryDate: string;
    placeOfSignature: string;
    clubAcademyRepresentativeName: string;
    clubAcademyAddress: string;
    clubAcademyPhoneNumber: string;
    clubAcademyEmail: string;
    aiffNumber: string;
    crsUserName: string;
    legalGuardianName: string;
    playerAddress: string;
    playerMobileNumber: string;
    playerEmail: string;
    clubAcademyUsesAgentServices: boolean;
    clubAcademyIntermediaryName: string;
    clubAcademyTransferFee: string;
    playerUsesAgentServices: boolean;
    playerIntermediaryName: string;
    playerTransferFee: string;
    status: string;
    otherName: string;
    otherEmail: string;
    otherPhoneNumber: string;
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
    aiffNumber: string;
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
    context: GetContractContext
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
