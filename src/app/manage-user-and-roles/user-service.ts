import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  getUser: () => `/user/list`,
  saveUser: () => `/user/create`,
  getUserById: (id: string) => `/user/${id}`,
  updateUser: (id: string) => `/user/${id}`,
  deleteUser: (id: string) => `/user/${id}`,
  importCSV: () => `/user/import/csv`
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserListing(): Observable<any> {
    return this.httpClient.get(routes.getUser());
    // .pipe(
    //     map((body: any) => body.value),
    //     catchError(err => throwError(new Error(err.message)))
    // );
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get(routes.getUserById(id));
  }
  saveUser(data: any): Observable<any> {
    return this.httpClient.post<any>(routes.saveUser(), data);
  }
  updateUser(id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(routes.updateUser(id), data);
  }
  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(routes.deleteUser(id));
  }
  importCSV(data: any): Observable<any> {
    return this.httpClient.post<any>(routes.importCSV(), data);
  }
}
