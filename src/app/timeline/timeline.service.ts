import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getAchievementCount: () => '/achievement/stats',
  likePost: (post_id: string) => `/post/${post_id}/like`,
  unlikePost: (post_id: string) => `/post/${post_id}/dislike`
};

interface CommonResponseContext {
  status: string;
  message: string;
}
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

  likePost(post_id: string): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.likePost(post_id),
      post_id
    );
  }

  unlikePost(post_id: string): Observable<CommonResponseContext> {
    return this.httpClient.post<CommonResponseContext>(
      routes.unlikePost(post_id),
      post_id
    );
  }
}
