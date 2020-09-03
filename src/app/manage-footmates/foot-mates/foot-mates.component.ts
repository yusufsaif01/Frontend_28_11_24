import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MutualFootmateComponent } from '@app/manage-footmates/mutual-footmate/mutual-footmate.component';
import { FootMatesService } from '@app/manage-footmates/foot-mates/foot-mates.service';
import { untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { SharedService } from '@app/shared/shared.service';

interface FootMatesContext {
  name: string;
  position: string;
  player_type: string;
  avatar: string;
  user_id: string;
  mutuals: number;
}

@Component({
  selector: 'app-footmates',
  templateUrl: './foot-mates.component.html',
  styleUrls: ['./foot-mates.component.scss']
})
export class FootMatesComponent implements OnInit, OnDestroy {
  sidebar: boolean = false;
  filter: any = {};
  selectedPage: number;

  filtersList = {
    position: true,
    playerCategory: true,
    age: true,
    location: true,
    strongFoot: true,
    teamTypes: false,
    ability: false,
    status: false
  };

  panelOptions: object = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    player_type: true,
    follows_buttons: false
  };

  foot_data: any;
  pageSize: number = 20;
  pageNo: number = 1;
  show_count: number = 0;

  footMatesList: FootMatesContext[] = [];
  constructor(
    public dialog: MatDialog,
    private _footMatesService: FootMatesService,
    private _toastrService: ToastrService,
    private _sharedService: SharedService
  ) {}

  ngOnDestroy() {}

  openFilter() {
    this._sharedService.setFilterDisplayValue(true);
  }

  // MutualFootmates
  openDialog(foot_mate: any): void {
    const dialogRef = this.dialog.open(MutualFootmateComponent, {
      // width: '40%',
      panelClass: 'mutualfootmate',
      data: { id: foot_mate.user_id }
    });
  }

  ngOnInit() {
    this.filter.page_size = this.pageSize;
    this.filter.page_no = this.pageNo;
    this.getFootMateList();
    this.getConnectionStats({});
  }

  getFootMateList() {
    if (this.filter.hasOwnProperty('footplayer_category')) {
      Object.defineProperty(
        this.filter,
        'player_category',
        Object.getOwnPropertyDescriptor(this.filter, 'footplayer_category')
      );
      delete this.filter['footplayer_category'];
    }

    this._footMatesService
      .getFootMateList(this.filter)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
          }
          this.footMatesList = records;
          this.show_count = response.data.records.length;
          this.foot_data.footmates = response.data.total;
          this.selectedPage = this.filter.page_no;
        },
        error => {}
      );
  }

  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.pageNo = event.selectedPage;
    this.filter.page_no = this.pageNo;
    this.getFootMateList();
  }

  getConnectionStats(data: object) {
    this.foot_data = data;
  }

  onChangeFilter(event: any) {
    if (event) {
      this.filter = event;
    } else {
      this.filter = {};
    }
    this.selectedPage = 1;
    this.filter.page_no = 1;
    this.filter.page_size = 20;
    this.getFootMateList();
  }
}
