import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { HeaderService } from './header.service';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
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
export class HeaderComponent implements OnInit, OnDestroy {
  public isActive: boolean = true;
  public avatar_url: string = localStorage.getItem('avatar_url');
  public member_type: string = localStorage.getItem('member_type');
  memberList: MemberListContext[] = [];
  searchText = '';
  pageNo: number = 1;
  pageSize: number = 10;
  keyCode: number;
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _headerService: HeaderService,
    private _toastrService: ToastrService
  ) {}

  ngOnDestroy() {}

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

  getMemberSearchList(value: string, keyCode: number, scrolled?: string) {
    this.keyCode = keyCode;
    if (
      keyCode == 40 ||
      keyCode == 37 ||
      keyCode == 39 ||
      keyCode == 38 ||
      keyCode == 9 ||
      keyCode == 34 ||
      keyCode == 35 ||
      keyCode == 36 ||
      keyCode == 37
    )
      return;
    this.searchText = value;
    if (value.length === 0) {
      this.memberList = [];
      this.pageNo = 1;
    }
    if (value.length < 3) {
      this.memberList = [];
      this.pageNo = 1;
      return;
    }
    if (!scrolled) {
      this.pageNo = 1;
    }
    this._headerService
      .getMemberSearchList({
        search: value,
        page_no: this.pageNo,
        page_size: this.pageSize
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i].avatar = environment.mediaUrl + records[i].avatar;
          }

          if (!scrolled) {
            this.memberList = records;
          } else {
            records.forEach(el => {
              if (!this.memberList.includes(el)) {
                this.memberList.push(el);
              }
            });
          }
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  onScrollDown() {
    console.log('Scrolled down');
    this.pageNo++;
    this.getMemberSearchList(this.searchText, this.keyCode, 'scrolled');
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
