import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  deleteAccount: (user_id: string) => `/member/delete/${user_id}`
};

@Injectable({
  providedIn: 'root'
})
export class AccountDeleteService {
  constructor(private httpClient: HttpClient) {}

  deleteAccount(user_id: string): Observable<any> {
    return this.httpClient.delete<any>(routes.deleteAccount(user_id));
  }
  ngOnDestroy() {}
}
