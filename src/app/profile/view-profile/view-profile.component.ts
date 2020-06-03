import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { PanelOptions } from '@app/shared/models/panel-options.model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  environment = environment;
  profile: any;
  numbers: any;
  aadhar: string;
  employment_contract: string;
  document: string;
  panelOptions: Partial<PanelOptions> = {
    player_type: false,
    logout_link: true,
    achievements: true,
    is_public: false
  };
  docNumber: string;
  isPublic: boolean = false;
  userId: string;

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
        this.userId = params['handle'];
      }
    });
  }

  ngOnInit() {
    this.numbers = [1, 2, 3, 4, 5];
    this.getProfile({});
  }

  logout() {
    this._authenticationService.logout();
  }

  getProfile(data: object) {
    this.profile = data;
    if (!this.isPublic && this.profile) this.setDocuments();
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  setDocuments() {
    if (this.profile.documents && this.profile.documents.length !== 0) {
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
  }
}
