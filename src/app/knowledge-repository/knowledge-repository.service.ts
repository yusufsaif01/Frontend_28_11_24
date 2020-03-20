import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const routes = {
  contentList: () => `/knowledgeRepository/list`,
  addToList: () => `/knowledgeRepository/create`,
  getContentById: (id: string) => `/knowledgeRepository/${id}`,
  updateContent: (id: string) => `/knowledgeRepository/${id}`
};
@Injectable({
  providedIn: 'root'
})
export class KnowledgeRepositoryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) {}

  getContentListing() {
    return this.httpClient.get(routes.contentList(), this.httpOptions);
  }
  addContent(data: any) {
    return this.httpClient.post(routes.addToList(), data, this.httpOptions);
  }
  getContentById(id: string) {
    return this.httpClient.get(routes.getContentById(id), this.httpOptions);
  }
  updateContent(id: string, data: any) {
    return this.httpClient.put(routes.updateContent(id), data);
  }
}
