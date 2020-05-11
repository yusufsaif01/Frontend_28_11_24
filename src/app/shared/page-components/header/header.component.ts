import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { HeaderService } from './header.service';
import { environment } from '../../../../environments/environment';
interface MemberListContext {
  member_type: string;
  player_type: string;
  name: string;
  position: string;
  avatar: string;
  user_id: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isActive: boolean = true;
  public avatar_url: string = localStorage.getItem('avatar_url');
  memberList: MemberListContext[] = [];
  searchText = '';
  constructor(
    private router: Router,
    private _authenticationService: AuthenticationService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {}

  logout() {
    this._authenticationService.logout();
    this.router.navigateByUrl('/login');
  }
  changeDropdown() {
    if (this.isActive) {
      this.isActive = false;
    } else {
      this.isActive = true;
    }
  }

  getMemberSearchList(value: string) {
    this.searchText = value;
    if (value.length === 0) this.memberList = [];
    if (value.length < 3) return;
    this.headerService.getMemberSearchList({ search: value }).subscribe(
      response => {
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i].avatar = environment.mediaUrl + records[i].avatar;
        }
        this.memberList = records;
      },
      error => {}
    );
  }
}
