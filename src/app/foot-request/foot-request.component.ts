import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MutualFootmateComponent } from './mutual-footmate/mutual-footmate.component';
import { FootRequestService } from './foot-request.service';
import { environment } from '../../environments/environment';

interface FootRequestContext {
  name: string;
  position: string;
  player_type: string;
  avatar: string;
  user_id: string;
  request_id: string;
  mutuals: number;
  accepted?: boolean;
  hide?: boolean;
}

@Component({
  selector: 'app-footrequest',
  templateUrl: './foot-request.component.html',
  styleUrls: ['./foot-request.component.scss']
})
export class FootRequestComponent implements OnInit {
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
  pageSize: number = 12;
  show_count: number = 0;
  total_count: number = 0;

  footRequestList: FootRequestContext[] = [];

  constructor(
    public dialog: MatDialog,
    private footRequestService: FootRequestService
  ) {}
  // MatualFootmates
  openDialog(): void {
    const dialogRef = this.dialog.open(MutualFootmateComponent, {
      width: '40%',
      panelClass: 'MatualFootmate'
    });
  }
  ngOnInit() {
    this.getFootRequestList(this.pageSize, 1);
    this.connectionStats();
  }

  getFootRequestList(page_size: number, page_no: number) {
    this.footRequestService
      .getFootRequestList({ page_size, page_no })
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
          }
          this.footRequestList = records;
          this.show_count = response.data.records.length;
        },
        error => {}
      );
  }

  acceptFootRequest(footRequest: FootRequestContext) {
    this.footRequestService
      .acceptFootRequest({ request_id: footRequest.request_id })
      .subscribe(
        response => {
          footRequest.hide = true;
          footRequest.accepted = true;
        },
        error => {}
      );
  }
  rejectFootRequest(footRequest: FootRequestContext) {
    this.footRequestService
      .rejectFootRequest({ request_id: footRequest.request_id })
      .subscribe(
        response => {
          footRequest.hide = true;
          footRequest.accepted = false;
        },
        error => {}
      );
  }
  updatePage(event: any) {
    this.getFootRequestList(this.pageSize, event.selectedPage);
  }

  connectionStats() {
    this.footRequestService.connectionStats().subscribe(
      response => {
        this.foot_mate_count = response.data.footmates;
        this.foot_request_count = response.data.footmate_requests;
        this.total_count = response.data.footmate_requests;
      },
      error => {}
    );
  }
}
