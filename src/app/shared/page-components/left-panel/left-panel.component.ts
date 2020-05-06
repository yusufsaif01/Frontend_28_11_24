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
  @Input() achievements: number = 0;
  environment = environment;

  @Input() options: any;
  @Output() sendPlayerType = new EventEmitter<string>();
  @Output() sendMemberType = new EventEmitter<string>();

  constructor(
    private _authenticationService: AuthenticationService,
    private _timelineService: TimelineService,
    private _router: Router
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
    this._authenticationService.getProfileDetails().subscribe(
      response => {
        this.profile = response.data;

        if (this.profile.avatar_url) {
          this.profile.avatar_url =
            this.environment.mediaUrl + this.profile.avatar_url;
        } else {
          this.profile.avatar_url =
            this.environment.mediaUrl + '/uploads/avatar/user-avatar.png';
        }
        this.sendPlayerType.emit(this.profile.player_type);
        this.sendMemberType.emit(this.profile.member_type);
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
}
