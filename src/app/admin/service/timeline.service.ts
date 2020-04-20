import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';

const routes = {
  getAchievementCount : () => '/count',
};

let achievementCount = {
  count : 10
};


@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) {}
  
  getAchievementCount(){
    let token = this.credentialsService.isAuthenticated()
    ? this.credentialsService.credentials['data']['token']
    : '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return achievementCount.count;
  }
}
