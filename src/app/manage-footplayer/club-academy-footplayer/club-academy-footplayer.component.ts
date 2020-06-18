import { Component, OnInit } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';

@Component({
  selector: 'app-club-academy-footplayer',
  templateUrl: './club-academy-footplayer.component.html',
  styleUrls: ['./club-academy-footplayer.component.scss']
})
export class ClubAcademyFootplayerComponent implements OnInit {
  // LEFT PANEL
  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    is_public: false,
    is_league: true
  };
  constructor() {}

  ngOnInit() {}
}
