import { Component, OnInit } from '@angular/core';
import { Constants } from '@app/shared/static-data/static-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarList: { link: string; name: string; imagePath: string }[] =
    Constants.SIDEBAR_LIST;
  constructor() {}

  ngOnInit(): void {}
}
