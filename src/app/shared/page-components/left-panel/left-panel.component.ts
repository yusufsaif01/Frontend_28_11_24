import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {
  AuthenticationService,
  untilDestroyed,
  CredentialsService
} from '@app/core';
import { TimelineService } from '@app/timeline/timeline.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ProfileService } from '@app/profile/profile.service';
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
export class LeftPanelComponent implements OnInit {
  count: countResponseDataContext = {
    achievements: 0,
    tournaments: 0
  };
  profile: any;
  environment = environment;

  @Input() achievements: number = 0;
  @Input() options: any;
  @Input() userId: string;
  @Input() is_following = false;
  @Input() is_footmate = 'Not_footmate';

  @Output() sendPlayerType = new EventEmitter<string>();
  @Output() sendMemberType = new EventEmitter<string>();
  @Output() sendProfileData = new EventEmitter<object>();
  following$: Observable<any>;

  constructor(
    private _authenticationService: AuthenticationService,
    private _profileService: ProfileService,
    private _timelineService: TimelineService,
    private _router: Router,
    private leftPanelService: LeftPanelService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getProfileDetails();
    this.getAchievementCount();
  }

  logout() {
    this._authenticationService.logout();
    this._router.navigateByUrl('/login');
  }

  getProfileDetails() {
    let data = {};
    if (this.userId) data = { user_id: this.userId };

    this._profileService.getProfileDetails(data).subscribe(
      response => {
        this.profile = response.data;
        this.setAvatar();

        this.sendPlayerType.emit(this.profile.player_type);
        this.sendMemberType.emit(this.profile.member_type);
        this.sendProfileData.emit(this.profile);
      },
      error => {}
    );
  }

  getAchievementCount() {
    this._timelineService.getAchievementCount().subscribe(
      response => {
        this.count = response.data;
        this.achievements = response.data.achievements;
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
      this.following$ = this.leftPanelService
        .unfollowUser({
          to: this.userId
        })
        .pipe(
          map(resp => {
            console.log(resp);
          }),
          catchError(err => {
            this.toastrService.error('Error', err.error.message);
            throw err;
          })
        );
    } else {
      this.following$ = this.leftPanelService
        .followUser({
          to: this.userId
        })
        .pipe(
          map(resp => {
            console.log(resp);
          }),
          catchError(err => {
            this.toastrService.error('Error', err.error.message);
            throw err;
          })
        );
    }
  }

  toggleFootMate() {
    if (this.is_footmate === 'Not_footmate') {
      this.leftPanelService
        .sendFootMate({
          to: this.userId
        })
        .subscribe(
          response => {
            this.is_footmate = 'Pending';
          },
          error => {}
        );
    } else if (this.is_footmate === 'Accepted') {
      this.leftPanelService
        .cancelFootMate({
          to: this.userId
        })
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
