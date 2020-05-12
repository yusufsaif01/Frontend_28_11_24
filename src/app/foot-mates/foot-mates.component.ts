import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MutualFootmateComponent } from '@app/foot-request/mutual-footmate/mutual-footmate.component';
import { FootMatesService } from './foot-mates.service';
import { environment } from '../../environments/environment';

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
export class FootMatesComponent implements OnInit {
  public active: boolean;

  menuOpened() {
    if (this.active) {
      this.active = false;
    } else {
      this.active = true;
    }
  }

  panelOptions: object = {
    bio: true,
    member_type: true,
    my_achievements: false,
    view_profile_link: false,
    player_type: true,
    follows_buttons: false
  };
  foot_request_count = 0;
  foot_mate_count = 0;
  pageSize: number = 20;
  show_count: number = 0;
  total_count: number = 0;
  footMatesList: FootMatesContext[] = [];
  constructor(
    public dialog: MatDialog,
    private footMatesService: FootMatesService
  ) {}
  // MatualFootmates
  openDialog(): void {
    const dialogRef = this.dialog.open(MutualFootmateComponent, {
      width: '40%',
      panelClass: 'MatualFootmate'
    });
  }

  ngOnInit() {
    this.getFootMateList(this.pageSize, 1);
    this.connectionStats();
  }
  getFootMateList(page_size: number, page_no: number) {
    this.footMatesService.getFootMateList({ page_size, page_no }).subscribe(
      response => {
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
        }
        this.footMatesList = records;
        this.show_count = response.data.records.length;
      },
      error => {}
    );
  }

  connectionStats() {
    this.footMatesService.connectionStats().subscribe(
      response => {
        this.foot_mate_count = response.data.footmates;
        this.foot_request_count = response.data.footmate_requests;
        this.total_count = response.data.footmates;
      },
      error => {}
    );
  }
}
