import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  addComment: (params: string) => `/post/${params}/comment`,
  likePost: (params: string) => `/post/${params}/like`,
  unlikePost: (params: string) => `/post/${params}/dislike`,
  getVideo: (params: string, query: string) => `/video/${params}/${query}`,
  updatePost: (post_id: string) => `/post/${post_id}`,
  deletePost: (post_id: string) => `/post/${post_id}`,
  getCommentListing: (params: string, query: string) =>
    `/post/${params}/comments${query}`
};

interface GetPostListingContext {
  page_no?: number;
  page_size?: number;
  comments?: number;
}

interface GetCommentListingContext {
  post_id: string;
  page_no?: number;
  page_size?: number;
}

interface GetCommentListingResponseContext {
  status: string;
  message: string;
  data: {
    total: number;
    records: {
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

interface CommonResponseContext {
  status: string;
  message: string;
}
interface likeUnlikeContext {
  post_id: string;
}

interface CommonResponseContext {
  status: string;
  message: string;
}
interface AddCommentContext {
  post_id: string;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class GallerySingleService {
  constructor(private httpClient: HttpClient) {}

  addComment(context: AddCommentContext): Observable<CommonResponseContext> {
    let params = '';

    if (context['post_id']) {
      params += `${context['post_id']}`;
    }

    let { comment } = context;

    return this.httpClient.post<CommonResponseContext>(
      routes.addComment(params),
      { comment }
    );
  }

  likePost(context: likeUnlikeContext): Observable<CommonResponseContext> {
    let params = '';
    if (context['post_id']) {
      params += `${context['post_id']}`;
    }
    return this.httpClient.post<CommonResponseContext>(
      routes.likePost(params),
      context
    );
  }

  unlikePost(context: likeUnlikeContext): Observable<CommonResponseContext> {
    let params = '';
    if (context['post_id']) {
      params += `${context['post_id']}`;
    }
    return this.httpClient.post<CommonResponseContext>(
      routes.unlikePost(params),
      context
    );
  }

  updatePost(post_id: string, context: any): Observable<any> {
    return this.httpClient.put<any>(routes.updatePost(post_id), context);
  }

  deletePost(post_id: string): Observable<any> {
    return this.httpClient.delete<any>(routes.deletePost(post_id));
  }

  getVideo(
    videoId: string,
    context: GetPostListingContext
  ): Observable<GetPostListingResponseContext> {
    let query = '?';

    if (context['comments']) {
      query += '&comments=' + context['comments'];
    }

    return this.httpClient.get<GetPostListingResponseContext>(
      routes.getVideo(videoId, query)
    );
  }

  getCommentListing(
    context: GetCommentListingContext
  ): Observable<GetCommentListingResponseContext> {
    let params = '';
    if (context['post_id']) {
      params += `${context['post_id']}`;
    }

    let query = '?';
    if (context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if (context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }

    return this.httpClient.get<GetCommentListingResponseContext>(
      routes.getCommentListing(params, query)
    );
  }
}
