import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FootPlayerTableConfig } from './foot-player-table-conf';
import { environment } from '../../../environments/environment';
import { PanelOptions } from '@app/shared/models/panel-options.model';

@Component({
  selector: 'app-foot-player',
  templateUrl: './foot-player.component.html',
  styleUrls: ['./foot-player.component.scss']
})
export class FootPlayerComponent implements OnInit {
  // TABLE CONFIG
  public tableConfig: FootPlayerTableConfig = new FootPlayerTableConfig();
  public dataSource = new MatTableDataSource([]);
  pageSize: number = 10;
  currentPageNo: number = 1;
  selectedPage: number;
  environment = environment;
  player_type: string;
  member_type: string;
  show_count: number;
  total_count: number;

  // LEFT PANEL
  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    is_public: false
  };
  isPublic: boolean = false;
  userId: string;

  ngOnInit() {}
}
