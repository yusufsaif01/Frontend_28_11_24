import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// /footplayers?search=<text>&page_no=1&page_size=10
const routes = {};

interface GetFootPlayerList {
  status: string;
  message: string;
  data: {
    total: 20;
    records: [
      {
        id: string;
        user_id: string;
        avatar: string;
        category: string;
        name: string;
        position: string;
        status: string;
      }
    ];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FootPlayerService {
  constructor(private _httpClient: HttpClient) {}
}
