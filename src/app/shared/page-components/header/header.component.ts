import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { HeaderService } from './header.service';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { debounceTime, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { StatusConfirmationComponent } from '@app/shared/dialog-box/status-confirmation/status-confirmation.component';
import { FootRequestService } from '@app/manage-footmates/foot-request/foot-request.service';

interface MemberListContext {
  member_type: string;
  player_type: string;
  name: string;
  position: string;
  avatar: string;
  user_id: string;
}

let keyCodeObject = {
  tab: 9,
  pageUp: 33,
  pageDown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isActive: boolean = true;
  public isFootplayerActive: boolean = true;
  @Input() public avatar_url: string = localStorage.getItem('avatar_url');
  public member_type: string = localStorage.getItem('member_type');

  memberList: MemberListContext[] = [];
  searchText: string = '';
  tempSearchText: string = '';
  pageNo: number = 1;
  pageSize: number = 25;
  keyCode: number;

  results$: Observable<any>;
  subject = new Subject();
  totalRecordSubject$ = new Subject();
  stats: any = {};
  uploader: any;

  constructor(
    private dialog: MatDialog,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _headerService: HeaderService,
    private _toastrService: ToastrService,
    private _footRequestService: FootRequestService,
    private _store: Store<any>
  ) {
    _store.select('uploader').subscribe(uploader => {
      this.uploader = uploader.data;
    });
  }

  ngOnDestroy() {}

  ngOnInit() {
    this.searchInit();
    this.getConnectionStats();
  }
  getConnectionStats() {
    let data = { user_id: localStorage.getItem('user_id') };
    this._footRequestService
      .connectionStats(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.stats.total_requests = response.data.total_requests;
        },
        error => {}
      );
  }
  logout() {
    if (this.uploader) {
      const dialogRef = this.dialog.open(StatusConfirmationComponent, {
        width: '50% ',
        panelClass: 'filterDialog',
        data: {
          message:
            'Are you sure you want to logout? Video upload is currently in progress, please wait until completion else your video will not be saved and published on your profile.',
          header: 'Status confirmation'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) this._authenticationService.logout();
        this._store.dispatch({ type: 'COMPLETED_UPLOAD' });
      });
    } else {
      this._authenticationService.logout();
    }
  }
  changeDropdown() {
    if (this.isActive) {
      this.isActive = false;
    } else {
      this.isActive = true;
    }
  }
  onchangefootplayer() {
    if (this.isFootplayerActive) {
      this.isFootplayerActive = false;
    } else {
      this.isFootplayerActive = true;
    }
  }

  getMemberSearchList(value: string, keyCode: number, scrolled?: string) {
    this.keyCode = keyCode;
    let keyCodeList = Object.values(keyCodeObject);

    if (keyCodeList.includes(keyCode)) {
      // For debugging purpose get key name
      // for (var key in keyCodeObject) {
      //   if (keyCodeObject[key] === keyCode) {
      //     console.log(key, keyCode);
      //   }
      // }
      return;
    }

    this.searchText = value;

    // if (value.length === 0) {
    //   this.memberList = [];
    //   this.pageNo = 1;
    // }
    // if (value.length < 3) {
    //   this.memberList = [];
    //   this.pageNo = 1;
    //   return;
    // }
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
        if (data.searchText !== this.tempSearchText || this.pageNo > 1) {
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
                  records[i].avatar = records[i].avatar;
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
                if (response.data.total) {
                  this.totalRecordSubject$.next(false);
                } else {
                  this.totalRecordSubject$.next(true);
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
      window.open(`/member/profile/public/${user_id}`, '_blank');
    });
  }
}
