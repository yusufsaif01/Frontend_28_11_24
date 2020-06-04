import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getFootPlayerList: (query: string) => `/footplayers${query}`,
  deleteFootplayer: (id: string) => `/footplayers/${id}`
};

interface GetFootPlayerListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      id: string;
      user_id: string;
      avatar: string;
      category: string;
      name: string;
      position: string;
      status: string;
    }[];
  };
}

interface GetFootPlayerListContext {
  search?: string;
  page_no?: number;
  page_size?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FootPlayerService {
  constructor(private httpClient: HttpClient) {}

  getFootPlayerList(
    context: GetFootPlayerListContext
  ): Observable<GetFootPlayerListResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    if (context['search']) {
      query += '&search=' + context['search'];
    }
    return this.httpClient.get<GetFootPlayerListResponseContext>(
      routes.getFootPlayerList(query)
    );
  }
  deleteFootplayer(id: string) {
    return this.httpClient.delete<any>(routes.deleteFootplayer(id));
  }
}
