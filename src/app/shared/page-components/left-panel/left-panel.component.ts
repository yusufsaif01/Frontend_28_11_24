import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import {
  AuthenticationService,
  untilDestroyed,
  CredentialsService
} from '@app/core';
import { TimelineService } from '@app/timeline/timeline.service';
import { FootRequestService } from '@app/manage-footmates/foot-request/foot-request.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ViewProfileService } from '@app/profile/view-profile/view-profile.service';
import { LeftPanelService } from './left-panel.service';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

interface countResponseDataContext {
  achievements: number;
  tournaments: number;
}
@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftPanelComponent implements OnInit, OnDestroy {
  count: countResponseDataContext = {
    achievements: 0,
    tournaments: 0
  };
  profile: any;
  environment = environment;
  member_type: string = localStorage.getItem('member_type');
  loggedin_userid: string = localStorage.getItem('user_id');
  achievements: number = 0;

  @Input() options: any;
  @Input() userId: string;
  @Input() is_following = false;
  @Input() is_footmate = 'Not_footmate';
  followers: number = 0;

  @Output() sendPlayerType = new EventEmitter<string>();
  @Output() sendMemberType = new EventEmitter<string>();
  @Output() sendProfileData = new EventEmitter<object>();
  @Output() sendFootData = new EventEmitter<object>();
  @Output() sendAchievementCount = new EventEmitter<number>();
  following$: Observable<any>;

  constructor(
    private _authenticationService: AuthenticationService,
    private _profileService: ViewProfileService,
    private _timelineService: TimelineService,
    private _footRequestService: FootRequestService,
    private _router: Router,
    private _leftPanelService: LeftPanelService,
    private _toastrService: ToastrService
  ) {}

  ngOnDestroy() {}

  ngOnInit() {
    this.getProfileDetails();
    this.getAchievementCount();
    this.getConnectionStats();
  }

  logout() {
    this._authenticationService.logout();
    this._router.navigateByUrl('/login');
  }

  getProfileDetails() {
    let data = {};
    if (this.userId) data = { user_id: this.userId };

    this._profileService
      .getProfileDetails(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.profile = response.data;
          this.setAvatar();
          this.is_following = this.profile.is_followed;
          this.is_footmate = this.profile.footmate_status;
          this.sendPlayerType.emit(this.profile.player_type);
          this.sendMemberType.emit(this.profile.member_type);
          this.sendProfileData.emit(this.profile);
          this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        },
        error => {}
      );
  }

  getAchievementCount() {
    let data = {};
    if (this.userId) data = { user_id: this.userId };

    this._timelineService
      .getAchievementCount(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.count = response.data;
          this.achievements = response.data.achievements;
          this.sendAchievementCount.emit(this.achievements);
        },
        error => {}
      );
  }

  getConnectionStats() {
    let data = {};
    if (this.userId) data = { user_id: this.userId };

    this._footRequestService
      .connectionStats(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.followers = response.data.followers;
          this.sendFootData.emit(response.data);
        },
        error => {}
      );
  }

  setAvatar() {
    if (this.profile.avatar_url) {
      this.profile.avatar_url =
        this.environment.mediaUrl + this.profile.avatar_url;
    } else {
      this.profile.avatar_url =
        this.environment.mediaUrl + '/uploads/avatar/user-avatar.png';
    }
  }

  toggleFollow() {
    if (this.is_following) {
      this.following$ = this._leftPanelService
        .unfollowUser({
          to: this.userId
        })
        .pipe(
          map(resp => {
            console.log(resp);
            this.is_following = false;
          }),
          catchError(err => {
            this._toastrService.error('Error', err.error.message);
            throw err;
          }),
          untilDestroyed(this)
        );
    } else {
      this.following$ = this._leftPanelService
        .followUser({
          to: this.userId
        })
        .pipe(
          map(resp => {
            console.log(resp);
            this.is_following = true;
          }),
          catchError(err => {
            this._toastrService.error('Error', err.error.message);
            throw err;
          }),
          untilDestroyed(this)
        );
    }
  }

  toggleFootMate() {
    if (this.is_footmate === 'Not_footmate') {
      this._leftPanelService
        .sendFootMate({
          to: this.userId
        })
        .pipe(untilDestroyed(this))
        .subscribe(
          response => {
            this.is_footmate = 'Pending';
          },
          error => {}
        );
    } else if (this.is_footmate === 'Accepted') {
      this._leftPanelService
        .cancelFootMate({
          to: this.userId
        })
        .pipe(untilDestroyed(this))
        .subscribe(
          response => {
            this.is_footmate = 'Not_footmate';
            this.is_following = false;
          },
          error => {}
        );
    }
  }
}
