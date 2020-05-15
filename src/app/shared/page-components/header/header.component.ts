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
  public member_type: string = localStorage.getItem('member_type');
  memberList: MemberListContext[] = [];
  searchText = '';
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _headerService: HeaderService
  ) {}

  ngOnInit(): void {}

  logout() {
    this._authenticationService.logout();
    this._router.navigateByUrl('/login');
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
    this._headerService.getMemberSearchList({ search: value }).subscribe(
      response => {
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i].avatar = environment.mediaUrl + records[i].avatar;
        }
        this.memberList = records;
        document
          .getElementById('mat-autocomplete-0')
          .setAttribute('infiniteScroll', '');
        document
          .getElementById('mat-autocomplete-0')
          .setAttribute('infiniteScrollUpDistance', '1.5');
        document
          .getElementById('mat-autocomplete-0')
          .setAttribute('infiniteScrollDistance', '2');
        document
          .getElementById('mat-autocomplete-0')
          .setAttribute('infiniteScrollThrottle', '50');
        document
          .getElementById('mat-autocomplete-0')
          .setAttribute('scrollWindow', 'false');
        document
          .getElementById('mat-autocomplete-0')
          .setAttribute('fromRoot', 'true');
        document
          .getElementById('mat-autocomplete-0')
          .setAttribute(
            'infiniteScrollContainer',
            document.getElementById('mat-autocomplete-0').toString()
          );
        document
          .getElementById('mat-autocomplete-0')
          .addEventListener('scrolled', this.onScrollDown);
        document
          .getElementById('mat-autocomplete-0')
          .addEventListener('scrolledUp', this.onScrollUp);
        console.log(document.getElementById('mat-autocomplete-0'));
      },
      error => {}
    );
  }
  onScrollDown() {
    console.log('Scrolled down');
  }
  onScrollUp() {
    console.log('Scrolled Up');
  }

  openPublicProfile(user_id: string) {
    this._router.navigate([]).then(result => {
      window.open(`/member/profile/view/${user_id}`, '_blank');
    });
  }
}
