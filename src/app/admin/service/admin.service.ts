import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from '@app/core';
const routes = {
  getPlayerList:(c:PlayerListContext) => '/member/player/list'
}

interface PlayerListContext{
  page_no   ?: number;
  page_size ?: number;
  sort_by   ?: string;
  sort_order?: number;
  search    ?: string;
}

interface PlayerListResponseContext{
  data:{
    total :number;
    records :{
      name    : string,
      position: string,
      type    : string,
      email   : string,
      status  : string
    }[];
    player_count: {
      grassroot   : number,
      professional: number,
      amateur     : number
    }
  }
}

let clubResponse = {
  data: {
    total: 1,
    records: [
        {
            name: "club1",
            no_of_players: "",
            email: "club1@gmail.com",
            status: "pending"
        },
        {
          name: "club2",
          no_of_players: "2",
          email: "club1@gmail.com",
          status: "pending"
      }
    ]
  }
}

let academyResponse = {
  data: {
    total: 2,
    records: [
        {
            name: "acad1",
            no_of_players: "10",
            email: "acad1@gmail.com",
            status: "pending"
        },
        {
            name: "acad",
            no_of_players: "",
            email: "acad@gmail.com",
            status: "active"
        }
    ]
  }
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService
  ) { }

  getPlayerList(context:PlayerListContext):Observable<PlayerListResponseContext>{
    let token = this.credentialsService.isAuthenticated()
    ? this.credentialsService.credentials['data']['token']
    : '';
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      })
    };
    let query = '?';
    if(context['page_no']) {
      query += 'page_no=' + context['page_no'];
    }
    if(context['page_size']) {
      query += '&page_size=' + context['page_size'];
    }
    if(context['search']) {
      query += '&search=' + context['search'];
    }
    if(context['sort_by']) {
      query += '&sort_by=' + context['sort_by'];
    }
    if(context['sort_order']) {
      query += '&sort_order=' + context['sort_order'];
    }
    console.log(query);
    return this.httpClient.get<PlayerListResponseContext>(routes.getPlayerList(context)+ query,httpOptions)
  }
}
