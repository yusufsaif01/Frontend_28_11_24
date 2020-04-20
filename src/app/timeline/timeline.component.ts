import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { PostPopupComponent } from '@app/post-popup/post-popup.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TimelineService } from '@app/timeline/timeline.service';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  environment = environment;
  profile: any;
  achievement_count:number;
  tournament_count:number;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    dots: false,
    margin: 10,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    }
  };
  constructor(
    public dialog: MatDialog,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService,
    private _timelineService: TimelineService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PostPopupComponent, {
      width: '45%',
      panelClass: 'postpopup'
      // data: {}
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnInit() {
    this.getProfileData();
    this.getAchievementCount();
  }

  getProfileData() {
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

        this._toastrService.success(
          'Successful',
          'Data retrieved successfully'
        );
      },
      error => {
        console.log('error', error);
        this._toastrService.error(
          `${error.error.message}`,
          'Failed to load data'
        );
      }
    );
  }

  getAchievementCount(){
    this._timelineService.getAchievementCount().subscribe(
      response =>{
        this.achievement_count = response.data.achievements
        this.tournament_count = response.data.tournaments
      },
      error => {
        console.log('error', error);
        this._toastrService.error(
          `${error.error.message}`,
          'Failed to load data'
        );
      }
    )
  }
}
