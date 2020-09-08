import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '@app/shared/page-components/header/header.component';
import { LeftPanelComponent } from '@app/shared/page-components/left-panel/left-panel.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-edit-profile',
  templateUrl: './view-edit-profile.component.html',
  styleUrls: ['./view-edit-profile.component.scss']
})
export class ViewEditProfileComponent implements OnInit {
  @ViewChild(HeaderComponent, { static: true }) header: HeaderComponent;
  @ViewChild(LeftPanelComponent, { static: true })
  leftPanel: LeftPanelComponent;
  clubAcademyType: string;
  componentName: string = 'personal';
  renderComponents: any[];
  components: any[] = [
    { name: 'Personal details', value: 'personal' },
    { name: 'Professional details', value: 'professional' },
    { name: 'Documents', value: 'documents' },
    { name: 'Employment contracts', value: 'contracts' }
  ];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._activatedRoute.params.subscribe(params => {
      if (params['tabname']) this.componentName = params['tabname'];
    });
  }

  ngOnInit() {}

  switch(componentName: string) {
    this._router.navigate(['/member/profile', componentName]);
  }

  getClubAcademyType(value: string) {
    this.clubAcademyType = value;
  }

  getAvatarUrl(event: any) {
    this.header.avatar_url = event;
    this.leftPanel.profile.avatar_url = event;
  }

  getMemberType(value: string) {
    this.renderComponents = this.components.filter(item => {
      if (value !== 'player') return item.value !== 'contracts';
      return item.value;
    });
  }

  // toggle sidebar on mobile
  public sidebar = false;
}
