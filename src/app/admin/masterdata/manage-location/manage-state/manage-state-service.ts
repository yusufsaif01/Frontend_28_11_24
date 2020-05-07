import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';

const routes = {
  updateState: (state_id: any, country_id: any) =>
    `/master/state/${country_id}/${state_id}`
};

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(private httpClient: HttpClient) {}

  updateState(state_id: any, country_id: any, data: any): Observable<any> {
    return this.httpClient.put<any>(
      routes.updateState(state_id, country_id),
      data
    );
  }
}
