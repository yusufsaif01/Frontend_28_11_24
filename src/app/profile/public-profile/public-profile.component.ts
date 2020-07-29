import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PublicProfileService,
  GetPublicProfileDetailsResponseContext
} from './public-profile.service';
import { untilDestroyed } from '@app/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FootRequestService } from '@app/manage-footmates/foot-request/foot-request.service';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  environment = environment;
  data: any;
  followers = 0;
  is_public = false;
  tab = 'personal';
  logged_user_id = localStorage.getItem('user_id');
  publicProfileData: GetPublicProfileDetailsResponseContext['data'];
  user_id: string;
  member_type = localStorage.getItem('member_type');
  is_following = false;
  is_footmate = 'Not_footmate';
  following$: Observable<any>;
  panelOptions: Partial<PanelOptions> = {
    is_public: false
  };

  constructor(
    private _publicProfileService: PublicProfileService,
    private _toastrService: ToastrService,
    private _footRequestService: FootRequestService,
    private _activatedRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {
    this._activatedRoute.params.subscribe(param => {
      if (param.user_id) {
        this.user_id = param.user_id;
        this.is_public = true;
      } else {
        this.is_public = false;
      }
      this.panelOptions.is_public = this.is_public;
      this.getPublicProfileDetails();
    });
  }

  ngOnInit() {
    this.getConnectionStats();
  }

  transformURL(url: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  appendURL(url: string): SafeHtml {
    if (url.includes('http')) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(`https://${url}`);
  }

  setAvatar() {
    if (this.publicProfileData.avatar_url) {
      this.publicProfileData.avatar_url =
        this.environment.mediaUrl + this.publicProfileData.avatar_url;
    } else {
      this.publicProfileData.avatar_url =
        this.environment.mediaUrl + '/uploads/avatar/user-avatar.png';
    }
  }

  getPublicProfileDetails() {
    let data = { user_id: '' };
    if (this.user_id) {
      data = { user_id: this.user_id };
    } else {
      data = { user_id: this.logged_user_id };
    }
    this._publicProfileService
      .getPublicProfileDetails(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.publicProfileData = response.data;
          this.setAvatar();
          this.is_following = this.publicProfileData.is_followed;
          this.is_footmate = this.publicProfileData.footmate_status;
          this.data = { ...this.data, ...this.publicProfileData };
          // this.data.name = this.publicProfileData.name || `${this.publicProfileData.first_name} ${this.publicProfileData.last_name}`
          // this.data.type = this.publicProfileData.player_type || this.publicProfileData.member_type
          // this.data.position = this.publicProfileData.position && this.publicProfileData.position[0].name
          // this.data.club = this.publicProfileData.type
        },
        error => {
          console.log(error);
        }
      );
  }
  getConnectionStats() {
    let data = { user_id: '' };
    if (this.user_id) {
      data = { user_id: this.user_id };
    } else {
      data = { user_id: this.logged_user_id };
    }

    this._footRequestService
      .connectionStats(data)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.followers = response.data.followers;
          this.data.followers = this.followers;
          // this.sendFootData.emit(response.data);
        },
        error => {}
      );
  }

  toggleFollow() {
    if (this.is_following) {
      this.following$ = this._publicProfileService
        .unfollowUser({
          to: this.user_id
        })
        .pipe(
          map(response => {
            this.is_following = false;
            this.getConnectionStats();
          }),
          catchError(error => {
            this._toastrService.error('Error', error.error.message);
            throw error;
          }),
          untilDestroyed(this)
        );
    } else {
      this.following$ = this._publicProfileService
        .followUser({
          to: this.user_id
        })
        .pipe(
          map(response => {
            this.is_following = true;
            this.getConnectionStats();
          }),
          catchError(error => {
            this._toastrService.error('Error', error.error.message);
            throw error;
          }),
          untilDestroyed(this)
        );
    }
  }

  toggleFootMate() {
    if (this.is_footmate === 'Not_footmate') {
      this._publicProfileService
        .sendFootMate({
          to: this.user_id
        })
        .pipe(untilDestroyed(this))
        .subscribe(
          response => {
            this.is_footmate = 'Pending';
          },
          error => {
            this._toastrService.error('Error', error.error.message);
          }
        );
    } else if (this.is_footmate === 'Accepted') {
      this._publicProfileService
        .cancelFootMate({
          to: this.user_id
        })
        .pipe(untilDestroyed(this))
        .subscribe(
          response => {
            this.is_footmate = 'Not_footmate';
            this.is_following = false;
          },
          error => {
            this._toastrService.error('Error', error.error.message);
          }
        );
    }
  }

  getTab(value: string) {
    this.tab = value;
  }

  ngOnDestroy() {}
}
