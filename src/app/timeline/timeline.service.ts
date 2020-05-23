import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getAchievementCount: () => '/achievement/stats',
  createPost: () => `/post/add`,
  getPostListing: () => `/posts/list`,
  updatePost: (post_id: string) => `/post/${post_id}`,
  deletePost: (post_id: string) => `/post/${post_id}`
};

interface countResponseContext {
  data: {
    achievements: number;
    tournaments: number;
  };
}
interface achievementCountContext {
  user_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  constructor(private httpClient: HttpClient) {}

  getAchievementCount(
    context: Partial<achievementCountContext>
  ): Observable<countResponseContext> {
    let query = '?';
    if (context['user_id']) {
      query += 'user_id=' + context['user_id'];
      return this.httpClient.get<countResponseContext>(
        routes.getAchievementCount() + query
      );
    }

    return this.httpClient.get<countResponseContext>(
      routes.getAchievementCount()
    );
  }

  createPost(context: any): Observable<any> {
    return this.httpClient.post<any>(routes.createPost(), context);
  }

  updatePost(post_id: string, context: any): Observable<any> {
    return this.httpClient.put<any>(routes.updatePost(post_id), context);
  }

  deletePost(post_id: string): Observable<any> {
    return this.httpClient.delete<any>(routes.deletePost(post_id));
  }

  getPostListing(context: any = {}) {
    let query = '?';
    if (context['page_no']) query += 'page_no=' + context['page_no'];
    if (context['page_size']) query += '&page_size=' + context['page_size'];
    return this.httpClient.get<any>(routes.getPostListing() + query);
  }
}
