import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { HeaderService } from './header.service';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { debounceTime, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

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
  searchText: string = '';
  tempSearchText: string = '';
  pageNo: number = 1;
  pageSize: number = 10;
  keyCode: number;

  results$: Observable<any>;
  subject = new Subject();

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _headerService: HeaderService,
    private _toastrService: ToastrService
  ) {}

  ngOnDestroy() {}

  ngOnInit() {
    this.searchInit();
  }

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

    this.subject.next({
      searchText: this.searchText,
      scrolled: scrolled
    });
  }

  searchInit() {
    this.results$ = this.subject.pipe(
      debounceTime(1000),
      untilDestroyed(this),
      map((data: any) => {
        if (data.searchText !== this.tempSearchText) {
          // To check if other keys are not pressed
          this._headerService
            .getMemberSearchList({
              search: data.searchText,
              page_no: this.pageNo,
              page_size: this.pageSize
            })
            .subscribe(
              response => {
                let records = response.data.records;
                for (let i = 0; i < records.length; i++) {
                  records[i].avatar = environment.mediaUrl + records[i].avatar;
                }

                if (!data.scrolled) {
                  this.memberList = records;
                } else {
                  records.forEach(el => {
                    if (!this.memberList.includes(el)) {
                      this.memberList.push(el);
                    }
                  });
                }

                this.tempSearchText = this.searchText;
              },
              error => {
                this._toastrService.error('Error', error.error.message);
              }
            );
        }
      })
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
