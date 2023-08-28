import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getMemberSearchList: (c: GetMemberSearchListContext) => '/member/search'
};

interface GetMemberSearchListContext {
  search: string;
  page_no?: number;
  page_size?: number;
}

interface GetMemberSearchListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      member_type: string;
      player_type: string;
      name: string;
      position: string;
      avatar: string;
      user_id: string;
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private httpClient: HttpClient) {}

  getMemberSearchList(
    context: GetMemberSearchListContext
  ): Observable<GetMemberSearchListResponseContext> {
    let query = '?';
    if (context['search']) {
      query += 'search=' + context['search'];
    }

    if (context['page_no']) {
      query += '&page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    return this.httpClient.get<GetMemberSearchListResponseContext>(
      routes.getMemberSearchList(context) + query
    );
  }
}
