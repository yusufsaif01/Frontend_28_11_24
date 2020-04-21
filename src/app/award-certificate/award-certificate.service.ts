import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';

const routes = {
  addAwards:(c:any) => '/achievement/add',
}


@Injectable({
  providedIn: 'root'
})
export class AwardCertificateService {

  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) {}

  addAwards(context:any): Observable<any> {
    for (var pair of context.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    let token = this.credentialsService.isAuthenticated()
    ? this.credentialsService.credentials['data']['token']
    : '';
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };    
    return this.httpClient.post<any>(
      routes.addAwards(context),
      context,
      httpOptions
    );
  }
}
