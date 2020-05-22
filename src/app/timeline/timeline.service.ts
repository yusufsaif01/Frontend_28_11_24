import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const routes = {
  getAchievementCount: () => '/achievement/stats',
  addComment: (params: string) => `/post/${params}/comment`
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
}
