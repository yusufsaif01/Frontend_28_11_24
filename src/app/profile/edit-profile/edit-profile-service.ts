import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  editProfile: (c: any) => '/update-details',
  getPositionList: () => '/master/player-specialization/position/list',
  updateBio: (a: any) => '/update-bio',
  removeAvatar: () => '/avatar'
};

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  constructor(private httpClient: HttpClient) {}

  getPositionList(): Observable<any> {
    return this.httpClient.get<any>(routes.getPositionList());
  }

  editProfile(context: any): Observable<any> {
    return this.httpClient.put(routes.editProfile(context), context);
  }

  updateBio(context: any): Observable<any> {
    return this.httpClient.put(routes.updateBio(context), context);
  }

  removeAvatar(): Observable<any> {
    return this.httpClient.delete(routes.removeAvatar());
  }
}
