import { Component, OnInit, OnDestroy } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { FootPlayerService } from '../foot-player/foot-player.service';
import { untilDestroyed } from '@app/core';
import { environment } from '@env/environment';
import { SharedService } from '@app/shared/shared.service';

interface FootPlayerContext {
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
  filter: any = {};
  footPlayerList: FootPlayerContext[] = [];
  pageSize: number = 18;
  selectedPage: number = 1;
  environment = environment;
  show_count: number;
  total_count: number;
  member_type: string;
  footplayers: number;

  // LEFT PANEL
  panelOptions: Partial<PanelOptions> = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    is_public: false,
    is_league: true
  };

  filtersList = {
    position: true,
    playerCategory: true,
    age: true,
    location: true,
    strongFoot: true,
    teamTypes: true,
    ability: true,
    status: false
  };

  constructor(
    private _footPlayerService: FootPlayerService,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.filter.page_size = this.pageSize;
    this.filter.page_no = 1;
    this.filter.footplayers = 1;
    this.getFootPlayerList();
  }

  ngOnDestroy() {}

  openFilter() {
    this._sharedService.setFilterDisplayValue(true);
  }

  getMemberType(value: string) {
    this.member_type = value;
  }

  getSearchText(value: string) {
    let filterValue = value;
    this.filter.page_no = 1;
    this.selectedPage = 1;
    this.getFootPlayerList(filterValue);
  }

  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.filter.page_no = this.selectedPage;
    this.getFootPlayerList();
  }

  getFootPlayerList(search?: string) {
    this.filter.search = search;
    this._footPlayerService
      .getFootPlayerList(this.filter)
      .pipe(untilDestroyed(this))
      .subscribe(response => {
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
        }
        this.footplayers = response.data.footplayers;
        this.footPlayerList = records;
        this.show_count = response.data.records.length;
        this.total_count = response.data.total;
      });
  }

  onChangeFilter(event: any) {
    if (event) {
      this.filter = event;
    } else {
      this.filter = {};
    }
    this.filter.page_no = 1;
    this.filter.footplayers = 1;
    this.filter.page_size = 10;
    this.selectedPage = 1;
    this.getFootPlayerList();
  }
}
