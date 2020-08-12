import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { AuthenticationService, untilDestroyed } from '@app/core';
import { TimelineService } from '@app/timeline/timeline.service';
import { FootRequestService } from '@app/manage-footmates/foot-request/foot-request.service';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { ViewEditProfileService } from '@app/profile/view-edit-profile/view-edit-profile.service';
import { LeftPanelService } from './left-panel.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PublicProfileService } from '@app/profile/public-profile/public-profile.service';

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
  // profileDataPopulated: boolean = false;
  environment = environment;
  member_type: string = localStorage.getItem('member_type');
  logged_user_id: string = localStorage.getItem('user_id');
  profile_status: string;

  @Input() data: any;
  @Input() achievements: number = 0;
  @Input() options: any;
  @Input() userId: string = '';
  @Input() is_following = false;
  @Input() is_footmate = 'Not_footmate';
  @Input() followers: number;
  @Output() sendClubAcademyType = new EventEmitter<string>();
  @Output() sendPlayerType = new EventEmitter<string>();
  @Output() sendMemberType = new EventEmitter<string>();
  @Output() sendProfileData = new EventEmitter<object>();
  @Output() sendFootData = new EventEmitter<object>();
  @Output() sendAchievementCount = new EventEmitter<number>();
  @Output() sendProfileStatus = new EventEmitter<object>();
  following$: Observable<any>;
  professionalProfile: any = {};

  constructor(
    private _authenticationService: AuthenticationService,
    private _profileService: ViewEditProfileService,
    private _timelineService: TimelineService,
    private _footRequestService: FootRequestService,
    private _router: Router,
    private _publicProfileService: PublicProfileService,
    private _toastrService: ToastrService
  ) {}

  ngOnDestroy() {}

  ngOnInit() {
    if (this.userId) {
      this.getPublicProfileDetails();
    }
    this.getPersonalProfileDetails();
    this.getProfessionalProfileDetails();
    this.getAchievementCount();
    this.getConnectionStats();
  }

  getPublicProfileDetails() {
    let data = { user_id: '' };
    data.user_id = this.userId ? this.userId : this.logged_user_id;

    this._publicProfileService
      .getPublicProfileDetails(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.data = response.data;
          this.setAvatar(this.data);
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  getProfessionalProfileDetails() {
    this._profileService
      .getProfessionalProfileDetails()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.professionalProfile = response.data;
          this.sendClubAcademyType.emit(this.professionalProfile.type);
        },
        error => {}
      );
  }

  logout() {
    this._authenticationService.logout();
    this._router.navigateByUrl('/login');
  }

  getPersonalProfileDetails() {
    let data = {};
    // if (this.userId) data = { user_id: this.userId }; This is for public profile, will be catered later

    this._profileService
      .getPersonalProfileDetails()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.profile = response.data;
          // this.profileDataPopulated = true;
          this.setAvatar(this.profile);
          this.is_following = this.profile.is_followed;
          this.is_footmate = this.profile.footmate_status;
          this.profile_status = this.profile.profile_status.status;
          this.sendPlayerType.emit(this.profile.player_type);
          this.sendMemberType.emit(this.profile.member_type);
          this.sendProfileData.emit(this.profile);
          this.sendProfileStatus.emit(this.profile.profile_status.status);
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

  setAvatar(data: any) {
    if (data.avatar_url) {
      data.avatar_url = this.environment.mediaUrl + data.avatar_url;
    } else {
      data.avatar_url =
        this.environment.mediaUrl + '/uploads/avatar/user-avatar.png';
    }
  }
}
