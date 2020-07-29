import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  PublicProfileService,
  GetPublicProfileDetailsResponseContext
} from './public-profile.service';
import { untilDestroyed } from '@app/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  tab = 'personal';
  publicProfileData: GetPublicProfileDetailsResponseContext['data'];
  user_id: string;

  constructor(
    private _publicProfileService: PublicProfileService,
    private _activatedRoute: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) {
    this._activatedRoute.params.subscribe(param => {
      if (param.user_id) {
        this.user_id = param.user_id;
        this.getPublicProfileDetails();
      }
    });
  }

  ngOnInit() {}

  transformURL(url: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  appendURL(url: string): SafeHtml {
    if (url.includes('http')) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(`https://${url}`);
  }

  getPublicProfileDetails() {
    this._publicProfileService
      .getPublicProfileDetails({ user_id: this.user_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.publicProfileData = response.data;
        },
        error => {
          console.log(error);
        }
      );
  }

  getTab(value: string) {
    this.tab = value;
  }

  ngOnDestroy() {}
}
