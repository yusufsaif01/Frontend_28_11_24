import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';

const routes = {
  addAwards: (c: any) => '/achievement/add',
  updateAwards: (id: any) => `/achievement/${id}`,
  getAwardsList: (c: CommonContext) => '/achievement/list',
  getPublicAwardsList: (user_id: any, c: CommonContext) =>
    `/member/public/achievement/${user_id}`,
  deleteAward: (c: DeleteAwardContext) => '/achievement'
};

interface CommonContext {
  page_no?: number;
  page_size?: number;
}
interface AwardsListResponseContext {
  data: {
    total: number;
    records: {
      type: string;
      name: string;
      year: string;
      position: string;
      media: string;
    }[];
  };
}
interface DeleteAwardContext {
  id: string;
}

interface DelEditAddAwardResponseContext {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AwardCertificateService {
  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) {}

  addAwards(context: any): Observable<DelEditAddAwardResponseContext> {
    return this.httpClient.post<DelEditAddAwardResponseContext>(
      routes.addAwards(context),
      context
    );
  }

  updateAwards(id: any, context: any): Observable<any> {
    return this.httpClient.put<any>(routes.updateAwards(id), context);
  }

  deleteAward(context: DeleteAwardContext) {
    let params = '/';
    if (context['id']) {
      params += `${context['id']}`;
    }
    return this.httpClient.delete<DelEditAddAwardResponseContext>(
      routes.deleteAward(context) + params
    );
  }

  // /api/achievement/list?page_no=1&page_size=20
  getAwardsList(context: CommonContext): Observable<AwardsListResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    return this.httpClient.get<AwardsListResponseContext>(
      routes.getAwardsList(context) + query
    );
  }

  getPublicAwardsList(
    user_id: string,
    context: CommonContext
  ): Observable<AwardsListResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    return this.httpClient.get<AwardsListResponseContext>(
      routes.getPublicAwardsList(user_id, context) + query
    );
  }
}
