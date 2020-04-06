import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  sidebarList: { link: string; name: string; imagePath: string }[] = [
    {
      link: './dashboard',
      name: 'Dashboard',
      imagePath: 'assets/images/icons/sidebar/dashboard.svg'
    },
    {
      link: './courses',
      name: 'Member Management',
      imagePath: 'assets/images/icons/sidebar/member.svg'
    },

    {
      link: './courses',
      name: 'Manage Player',
      imagePath: 'assets/images/icons/sidebar/player.svg'
    },

    {
      link: './courses',
      name: 'Manage Clubs',
      imagePath: 'assets/images/icons/sidebar/club.svg'
    },

    {
      link: './courses',
      name: 'Manage Academy',
      imagePath: 'assets/images/icons/sidebar/academy.svg'
    },

    {
      link: './courses',
      name: 'Manage User',
      imagePath: 'assets/images/icons/sidebar/manage-user.svg'
    },
    {
      link: './courses',
      name: 'Master Data',
      imagePath: 'assets/images/icons/sidebar/master-data.svg'
    },
    {
      link: './courses',
      name: 'Manage Contracts',
      imagePath: 'assets/images/icons/sidebar/manage-contract.svg'
    },
    {
      link: './events',
      name: 'Manage Subscription',
      imagePath: 'assets/images/icons/sidebar/manage-subscription.svg'
    },
    {
      link: './reports',
      name: 'Manage Reports',
      imagePath: 'assets/images/icons/sidebar/manage-reports.svg'
    }
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'dashboard',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icons/sidebar/dashboard.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'member',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icons/sidebar/member.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-player',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icons/sidebar/player.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-club',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icons/sidebar/club.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-academy',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icons/sidebar/academy.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-user',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icons/sidebar/manage-user.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'master-data',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icons/sidebar/master-data.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-contracts',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icons/sidebar/manage-contract.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-subscription',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icons/sidebar/manage-subscription.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-reports',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/icons/sidebar/manage-reports.svg'
      )
    );
  }

  ngOnInit() {}
}
