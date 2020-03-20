import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarList: { link: string; name: string; imagePath: string }[] = [
    { link: './dashboard', name: 'Dashboard', imagePath: 'assets/images/icons/sidebar/dashboard.png' },
    {
      link: '/users',
      name: 'Manage User and Roles',
      imagePath: 'assets/images/icons/sidebar/user.png'
    },
    { link: '/courses', name: 'Manage Course Module', imagePath: 'assets/images/icons/sidebar/book.png' },
    { link: '/manage-chapter', name: 'Manage Chapter', imagePath: 'assets/images/icons/sidebar/manage-chapter.png' },
    {
      link: '/manage-quiz-content',
      name: 'Manage Quiz Content',
      imagePath: 'assets/images/icons/sidebar/quiz-content.png'
    },
    {
      link: '/manage-question-content',
      name: 'Manage Question Content',
      imagePath: 'assets/images/icons/sidebar/question-content.png'
    },
    {
      link: '/manage-announcement',
      name: 'Manage Announcements',
      imagePath: 'assets/images/icons/sidebar/manage-announcement.png'
    },
    {
      link: '/knowledge-repo',
      name: 'Knowledge Repository',
      imagePath: 'assets/images/icons/sidebar/knowledge-repo.png'
    },
    {
      link: '/manage-credientials',
      name: 'Manage Credentials',
      imagePath: 'assets/images/icons/sidebar/manage-credientials.png'
    },
    { link: '/manage-reports', name: 'Manage Reports', imagePath: 'assets/images/icons/sidebar/manage-reports.png' }
  ];
  constructor() {}

  ngOnInit(): void {}
}
