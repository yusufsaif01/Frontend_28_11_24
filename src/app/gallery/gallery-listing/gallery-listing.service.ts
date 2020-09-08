import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomHttpParamEncoder } from '@app/shared/custom-http-param-encoder/custom-http-param-encoder.component';

const routes = {
  getGalleryList: (query: string) => `/video/gallery?${query}`,
  getPublicGalleryList: (user_id: string, query: string) =>
    `/video/public/gallery/${user_id}?${query}`
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

interface GetGalleryListResponseContext {
  status: string;
  message: string;
  data: {
    is_footplayer: boolean;
    total: number;
    posted_by: {
      member_type: string;
      user_id: string;
    };
    records: {
      created_at: string;
      id: string;
      media: {
        media_url: string;
        media_type: string;
        media_thumbnail: {
          sizes: {
            width: number;
            height: number;
            link: string;
            link_with_play_button: string;
          }[];
          url: string;
        };
      };
      meta?: {
        abilities: {
          ability_name: string;
          attributes: [];
        }[];
        others: [];
      };
      posted_by: {
        member_type: string;
        user_id: string;
      };
      status: string;
      type: string;
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
