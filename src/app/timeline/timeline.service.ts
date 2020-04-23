import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';

const routes = {
  getAchievementCount: () => '/timeline/achievement/stats'
};

interface countResponseContext {
  data: {
    achievements: number;
    tournaments: number;
  };
}
@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) {}

  getAchievementCount(): Observable<countResponseContext> {
    let token = this.credentialsService.isAuthenticated()
      ? this.credentialsService.credentials['data']['token']
      : '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };

    return this.httpClient.get<countResponseContext>(
      routes.getAchievementCount(),
      httpOptions
    );
  }
}
