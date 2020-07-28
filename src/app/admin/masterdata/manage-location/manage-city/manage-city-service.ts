import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';

const routes = {
  addDistrict: () => '/admin/master/district/add',
  updateDistrict: (district_id: any, country_id: any, state_id: any) =>
    `/admin/master/district/${country_id}/${state_id}/${district_id}`
};

interface AddCityContext {
  state_id: string;
  country_id: string;
  name: string;
}

interface CommonResponseContext {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private httpClient: HttpClient) {}

  addCity(context: AddCityContext): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.addDistrict(),
      context
    );
  }

  updateCity(
    state_id: any,
    city_id: any,
    country_id: any,
    data: any
  ): Observable<any> {
    return this.httpClient.put<any>(
      routes.updateDistrict(city_id, country_id, state_id),
      data
    );
  }
}
