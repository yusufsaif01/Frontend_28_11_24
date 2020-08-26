import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomHttpParamEncoder } from '@app/shared/custom-http-param-encoder/custom-http-param-encoder.component';

const routes = {
  getGalleryList: (query: string) => `/video/gallery?${query}`,
  getPublicGalleryList: (user_id: string, query: string) =>
    `/video/gallery/${user_id}/public?${query}`
};

export interface GetGalleryListContext {
  search?: string;
  page_no?: number;
  page_size?: number;
  type?: string;
  status?: string;
  from?: string;
  to?: string;
}
export interface GetGalleryListResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      user_id: string;
      avatar: string;
      name: string;
      category: 'professional' | 'amateur' | 'grassroot';
      total_report_cards: number;
      published_at: string;
      status: 'published' | 'draft' | '';
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class GalleryListingService {
  constructor(private _httpClient: HttpClient) {}

  getGalleryList(
    context: GetGalleryListContext
  ): Observable<GetGalleryListResponseContext> {
    let query = '?',
      httpParams = new HttpParams({ encoder: new CustomHttpParamEncoder() });
    Object.keys(context).forEach(key => {
      if (context[key]) httpParams = httpParams.append(key, context[key]);
    });

    if (context['type']) {
      query += 'type=' + context['type'];
    }

    return this._httpClient.get<GetGalleryListResponseContext>(
      routes.getGalleryList(httpParams.toString())
    );
  }

  getPublicGalleryList(
    userId: string,
    context: GetGalleryListContext
  ): Observable<GetGalleryListResponseContext> {
    let query = '?',
      httpParams = new HttpParams({ encoder: new CustomHttpParamEncoder() });
    Object.keys(context).forEach(key => {
      if (context[key]) httpParams = httpParams.append(key, context[key]);
    });

    if (context['type']) {
      query += 'type=' + context['type'];
    }

    return this._httpClient.get<GetGalleryListResponseContext>(
      routes.getPublicGalleryList(userId, httpParams.toString())
    );
  }
}
