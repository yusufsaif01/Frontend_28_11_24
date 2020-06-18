import { Component, OnInit, OnDestroy } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { FootPlayerService } from '../foot-player/foot-player.service';
import { untilDestroyed } from '@app/core';
import { environment } from '@env/environment';

interface FootPlayerContext {
  id: string;
  user_id: string;
  avatar: string;
  category: string;
  name: string;
  position: string;
}

@Component({
  selector: 'app-club-academy-footplayer',
  templateUrl: './club-academy-footplayer.component.html',
  styleUrls: ['./club-academy-footplayer.component.scss']
})
export class ClubAcademyFootplayerComponent implements OnInit, OnDestroy {
  footPlayerList: FootPlayerContext[] = [];
  pageSize: number = 18;
  selectedPage: number = 1;
  environment = environment;
  show_count: number;
  total_count: number;

  // LEFT PANEL
  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    is_public: false,
    is_league: true
  };
  constructor(private _footPlayerService: FootPlayerService) {}

  ngOnInit() {
    this.getFootPlayerList(this.pageSize, 1);
  }

  ngOnDestroy() {}

  getFootPlayerList(page_size: number, page_no: number, search?: string) {
    this._footPlayerService
      .getFootPlayerList({ page_no, page_size, search })
      .pipe(untilDestroyed(this))
      .subscribe(response => {
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
        }
        this.footPlayerList = records;
        this.show_count = response.data.records.length;
        this.total_count = response.data.total;
      });
  }
}
