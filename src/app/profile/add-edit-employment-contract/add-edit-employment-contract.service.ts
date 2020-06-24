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
    name: string;
    email: string;
    address: string;
    mobile: string;
    aiffNumber: string;
  }[];
}

interface addContractResponseContext {
  data: { id: string };
  status: string;
  message: string;
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

  addContract(context: FormData): Observable<addContractResponseContext> {
    return this.httpClient.post<addContractResponseContext>(
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
