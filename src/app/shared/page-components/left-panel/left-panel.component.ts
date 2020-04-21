import {
  Component,
  OnInit,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import {
  AuthenticationService,
  untilDestroyed,
  CredentialsService
} from '@app/core';
import { TimelineService } from '@app/timeline/timeline.service';
import { environment } from '../../../../environments/environment';

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
  achievement: any;
  environment = environment;

  // @Output() profileData = new EventEmitter<object>();
  // @Output() achievementData = new EventEmitter<object>();

  constructor(
    private _authenticationService: AuthenticationService,
    private _timelineService: TimelineService
  ) {}

  ngOnInit() {
    this.getProfileDetails();
    this.getAchievementCount();
  }

  getProfileDetails() {
    this._authenticationService.getProfileDetails().subscribe(
      response => {
        console.log('data', response);
        this.profile = response.data;

        if (this.profile.avatar_url) {
          this.profile.avatar_url =
            this.environment.mediaUrl + this.profile.avatar_url;
        } else {
          this.profile.avatar_url =
            this.environment.mediaUrl + '/uploads/avatar/user-avatar.png';
        }
        // this.profileData.emit(this.profile.avatar_url);
      },
      error => {
        console.log('error', error);
      }
    );
  }

  getAchievementCount() {
    this._timelineService.getAchievementCount().subscribe(
      response => {
        this.count = response.data;
        // this.achievementData.emit(response.data);
      },
      error => {
        console.log('error', error);
      }
    );
  }
}
