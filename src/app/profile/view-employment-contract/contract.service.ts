import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getContractDetails: (user_id: string) => `/employment-contract/${user_id}`,
  updateContractStatus: (id: string) => `/employment-contract/${id}/status`
};

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  constructor(private httpClient: HttpClient) {}

  getContractDetails(user_id: string): Observable<any> {
    return this.httpClient.get<any>(routes.getContractDetails(user_id));
  }

  updateContractStatus(id: string, data: any) {
    return this.httpClient.put<any>(routes.updateContractStatus(id), data);
  }
}
