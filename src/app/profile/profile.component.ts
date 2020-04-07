import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  environment = environment;
  profile: any;
  numbers: any;
  aadhar: string;
  employment_contract: string;
  document: string;
  constructor(
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.populateView();
    this.numbers = [1, 2, 3, 4, 5];
  }

  populateView() {
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

        if (this.profile.documents.length !== 0) {
          this.profile.documents.forEach(element => {
            let fileLink = this.environment.mediaUrl + element.link;
            if (element.type === 'aadhar') {
              this.aadhar = fileLink;
            }
            if (element.type === 'employment_contract') {
              this.employment_contract = fileLink;
            }
            if (
              element.type !== 'employment_contract' &&
              element.type !== 'aadhar'
            ) {
              this.document = fileLink;
            }
          });
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
}
