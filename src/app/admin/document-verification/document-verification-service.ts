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

  getStatus(id: string, member_type: string): Observable<any> {
    if (member_type === 'player')
      return this.httpClient.get<any>(routes.getPlayerStatus(id));
    else return this.httpClient.get<any>(routes.getClubAcademyStatus(id));
  }

  updateStatus(id: string, member_type: string, data: any) {
    if (member_type === 'player')
      return this.httpClient.put<any>(routes.updatePlayerStatus(id), data);
    else
      return this.httpClient.put<any>(routes.updateClubAcademyStatus(id), data);
  }
}
