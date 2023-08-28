import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  public isActive: boolean = true;
  public isActiveMasterData: boolean = true;

  sidebarList: { link: string; name: string; imagePath: string }[] = [
    {
      link: './dashboard',
      name: 'Dashboard',
      imagePath: 'dashboard'
    },
    {
      link: './courses',
      name: 'Member Management',
      imagePath: 'member'
    },

    {
      link: './courses',
      name: 'Manage Player',
      imagePath: 'manage-player'
    },

    {
      link: './courses',
      name: 'Manage Clubs',
      imagePath: 'manage-club'
    },

    {
      link: './courses',
      name: 'Manage Academy',
      imagePath: 'manage-academy'
    },

    {
      link: './courses',
      name: 'Manage User',
      imagePath: 'manage-user'
    },
    {
      link: './courses',
      name: 'Master Data',
      imagePath: 'master-data'
    },
    {
      link: './courses',
      name: 'Manage Privacy',
      imagePath: 'manage-privacy'
    },
    {
      link: './courses',
      name: 'Manage Contracts',
      imagePath: 'manage-contracts'
    },
    {
      link: './events',
      name: 'Manage Subscription',
      imagePath: 'manage-subscription'
    },
    {
      link: './reports',
      name: 'Manage Reports',
      imagePath: 'manage-report'
    }
  ];

  environment = environment;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl + '/assets/images/icons/sidebar/dashboard.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'member',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl + '/assets/images/icons/sidebar/member.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-player',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl + '/assets/images/icons/sidebar/player.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-club',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl + '/assets/images/icons/sidebar/club.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-academy',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl + '/assets/images/icons/sidebar/academy.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-user',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl +
          '/assets/images/icons/sidebar/manage-user.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'master-data',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl +
          '/assets/images/icons/sidebar/master-data.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-contracts',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl +
          '/assets/images/icons/sidebar/manage-contract.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-subscription',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl +
          '/assets/images/icons/sidebar/manage-subscription.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-ability',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl + '/assets/images/icons/sidebar/ability.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'down-arrow',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl +
          '/assets/images/icons/sidebar/down-arrow.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'report',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl +
          '/assets/images/icons/sidebar/manage-reports.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'location',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl + '/assets/images/icons/sidebar/location.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'member-type',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl +
          '/assets/images/icons/sidebar/member-type.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'player-specialization',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.environment.mediaUrl +
          '/assets/images/icons/sidebar/player-specialization.svg'
      )
    );
  }

  ngOnInit() {}
  changeDropdown() {
    if (this.isActive) {
      this.isActive = false;
    } else {
      this.isActive = true;
    }
  }
  // materdata
  onclickMasterData() {
    if (this.isActiveMasterData) {
      this.isActiveMasterData = false;
    } else {
      this.isActiveMasterData = true;
    }
  }
}
