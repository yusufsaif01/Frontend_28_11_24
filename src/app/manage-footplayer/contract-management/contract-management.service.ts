import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getContractList: (query: string) => `/employment-contract/list${query}`,
  deleteContract: (params: string) => `/employment-contract/${params}`
};

interface GetContactListContext {
  page_no: number;
  page_size: number;
}

interface CommonResponseContext {
  status: string;
  message: string;
}
interface DeleteContractContext {
  id: string;
}

interface GetContractListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      id: string;
      name: string;
      effectiveDate: string;
      expiryDate: string;
      created_by: string;
      status: string;
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ContractManagementService {
  constructor(private httpClient: HttpClient) {}

  getContractList(
    context: GetContactListContext
  ): Observable<GetContractListResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    return this.httpClient.get<GetContractListResponseContext>(
      routes.getContractList(query)
    );
  }

  deleteContract(
    context: DeleteContractContext
  ): Observable<CommonResponseContext> {
    let params = '';
    if (context['id']) {
      params += context['id'];
    }
    return this.httpClient.delete<CommonResponseContext>(
      routes.deleteContract(params)
    );
  }
}
