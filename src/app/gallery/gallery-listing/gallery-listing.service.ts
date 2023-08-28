import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomHttpParamEncoder } from '@app/shared/custom-http-param-encoder/custom-http-param-encoder.component';




const routes = {
  getGalleryList: (query: string) => `/video/gallery?${query}`,
  getPublicGalleryList: (user_id: string, query: string) =>
    `/video/public/gallery/${user_id}?${query}`,
    getPostListing: (query: string) => `/posts/list${query}`,
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

interface GetPostListingResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
      id: string;
      post: {
        text: string;
        media_url: string;
        media_type: string;
        media_thumbnail: {
          sizes: string;
        }[];
        meta?: {
          abilities: {
            ability_name: string;
            attributes: [];
          }[];
          others: [];
        };
      };
      posted_by: {
        avatar: string;
        member_type: string;
        user_id: string;
        name: string;
        type: string;
        position: string;
      };
      is_liked: boolean;
      likes: number;
      comments: {
        total: number;
        data: {
          comment: string;
          commented_by: {
            avatar: string;
            member_type: string;
            user_id: string;
            name: string;
            type: string;
            position: string;
          };
          commented_at: string;
        }[];
      };
      created_at: string;
    }[];
  };
}

interface GetPostListingContext {
  page_no?: number;
  page_size?: number;
  comments?: number;
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

  getPostListing(
    context: GetPostListingContext
  ): Observable<GetPostListingResponseContext> {
    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }

    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }

    if (context['comments']) {
      query += '&comments=' + context['comments'];
    }

    return this._httpClient.get<GetPostListingResponseContext>(
      routes.getPostListing(query)
    );
  }


}


