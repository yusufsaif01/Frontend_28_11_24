import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';

const routes = {
  updateCity: (city_id: any, country_id: any, state_id: any) =>
    `/master/city/${country_id}/${state_id}/${city_id}`
};

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private httpClient: HttpClient) {}

  updateCity(
    state_id: any,
    city_id: any,
    country_id: any,
    data: any
  ): Observable<any> {
    return this.httpClient.put<any>(
      routes.updateCity(city_id, country_id, state_id),
      data
    );
  }
}
