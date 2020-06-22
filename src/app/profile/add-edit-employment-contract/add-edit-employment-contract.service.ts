import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  addContract: () => '/employment-contract',
  getClubAcademyList: (query: string) => `/people/list${query}`
};

interface GetClubAcademyListContext {
  role: string;
}

interface GetClubAcademyListResponseContext {
  status: string;
  message: string;
  data: {
    user_id: string;
    name: string;
    email: string;
  }[];
}

interface CommonResponseContext {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddEditEmploymentContractService {
  constructor(private httpClient: HttpClient) {}

  addContract(context: FormData): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.addContract(),
      context
    );
  }
  getClubAcademyList(
    context: GetClubAcademyListContext
  ): Observable<GetClubAcademyListResponseContext> {
    let query = '?';

    if (context['role']) {
      query += 'role=' + context['role'];
    }
    return this.httpClient.get<GetClubAcademyListResponseContext>(
      routes.getClubAcademyList(query)
    );
  }
}
