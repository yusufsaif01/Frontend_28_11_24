import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { HeaderService } from './header.service';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
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
  memberBackupList: MemberListContext[] = [];
  searchText = '';
  pageNo: number = 1;
  pageSize: number = 10;
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _headerService: HeaderService,
    private _toastrService: ToastrService
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
    if (value.length === 0) {
      this.memberList = [];
      this.pageNo = 1;
    }
    if (value.length < 3) {
      this.memberList = [];
      this.pageNo = 1;
      return;
    }
    this._headerService
      .getMemberSearchList({
        search: value,
        page_no: this.pageNo,
        page_size: this.pageSize
      })
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i].avatar = environment.mediaUrl + records[i].avatar;
          }
          // this.memberList = records;
          // console.log(this.memberList);
          let res = records;
          this.onSuccess(res);
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }
  onSuccess(res: any[]) {
    res.forEach((el: any) => {
      if (!this.memberList.includes(el)) {
        this.memberList.push(el);
      }
    });
    console.log(this.memberList);
  }
  onScrollDown() {
    console.log('Scrolled down');
    this.pageNo++;
    this.getMemberSearchList(this.searchText);
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
