import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getPlayerStatus: (id: string) => `/player/${id}/documents`,
  updatePlayerStatus: (id: string) => `/player/${id}/documents/status`,
  getClubAcademyStatus: (id: string) => `/club-academy/${id}/documents`,
  updateClubAcademyStatus: (id: string) =>
    `/club-academy/${id}/documents/status`
};

@Injectable({
  providedIn: 'root'
})
export class DocumentVerificationService {
  constructor(private httpClient: HttpClient) {}

  updatePlayerStatus(id: string, data: any) {
    return this.httpClient.put<any>(routes.updatePlayerStatus(id), data);
  }

  getPlayerStatus(id: string): Observable<any> {
    return this.httpClient.get<any>(routes.getPlayerStatus(id));
  }

  updateClubAcademyStatus(id: string, data: any) {
    return this.httpClient.put<any>(routes.updateClubAcademyStatus(id), data);
  }

  getClubAcademyStatus(id: string): Observable<any> {
    return this.httpClient.get<any>(routes.getClubAcademyStatus(id));
  }
}
