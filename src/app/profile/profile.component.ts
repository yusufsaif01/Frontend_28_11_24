import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { PanelOptions } from '@app/shared/models/panel-options.model';

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
  panelOptions: Partial<PanelOptions> = {
    player_type: false,
    logout_link: true,
    is_public: false
  };
  docNumber: string;
  isPublic: boolean = false;

  constructor(
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe(params => {
      if (params['handle']) {
        this.panelOptions.is_public = true;
        this.isPublic = true;
      }
    });
  }

  ngOnInit() {
    this.populateView();
    this.numbers = [1, 2, 3, 4, 5];
  }

  logout() {
    this._authenticationService.logout();
    this._router.navigateByUrl('/login');
  }

  populateView() {
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

        if (this.profile.documents.length !== 0) {
          this.profile.documents.forEach((element: any) => {
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
              this.docNumber = element.document_number;
            }
          });
        }

        this._toastrService.success(
          'Successful',
          'Data retrieved successfully'
        );
      },
      error => {
        this._toastrService.error(
          `${error.error.message}`,
          'Failed to load data'
        );
      }
    );
  }
}
