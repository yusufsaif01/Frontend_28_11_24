import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontend-sidebar',
  templateUrl: './frontend-sidebar.component.html',
  styleUrls: ['./frontend-sidebar.component.scss']
})
export class FrontendSidebarComponent implements OnInit {
  sidebarList: { link: string; name: string; imagePath: string }[] = [
    {
      link: './dashboard',
      name: 'Dashboard',
      imagePath: 'assets/images/icons/sidebar/dashboard.png'
    },
    {
      link: './courses',
      name: 'Course',
      imagePath: 'assets/images/icons/sidebar/manage-chapter.png'
    },
    {
      link: './events',
      name: 'Events',
      imagePath: 'assets/images/icons/sidebar/manage-reports.png'
    },
    {
      link: './reports',
      name: 'Reports',
      imagePath: 'assets/images/icons/sidebar/manage-reports.png'
    },
    {
      link: './certficartion',
      name: 'Certificartion/Badges',
      imagePath: 'assets/images/icons/sidebar/manage-reports.png'
    },
    {
      link: './profile',
      name: 'Profile',
      imagePath: 'assets/images/icons/sidebar/user.png'
    }
  ];
  sidebarSupportList: { link: string; name: string; imagePath: string }[] = [
    {
      link: './knowledge-repo',
      name: 'Knowledge Repository',
      imagePath: 'assets/images/icons/sidebar/knowledge-repo.png'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
