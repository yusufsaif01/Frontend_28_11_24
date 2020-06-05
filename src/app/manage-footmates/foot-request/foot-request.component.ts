import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MutualFootmateComponent } from '../mutual-footmate/mutual-footmate.component';
import { FootRequestService } from './foot-request.service';
import { environment } from '../../../environments/environment';
import { untilDestroyed } from '@app/core';

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
interface FootPlayerRequestContext {
  user_id: string;
  avatar: string;
  name: string;
  member_type: string;
  sub_category: string;
  accepted?: boolean;
  hide?: boolean;
}
@Component({
  selector: 'app-footrequest',
  templateUrl: './foot-request.component.html',
  styleUrls: ['./foot-request.component.scss']
})
export class FootRequestComponent implements OnInit, OnDestroy {
  panelOptions: object = {
    bio: true,
    member_type: true,
    my_achievements: true,
    view_profile_link: true,
    player_type: true,
    follows_buttons: false
  };

  // foot_request_count = 0;
  // foot_mate_count = 0;
  foot_data: any;
  pageSize: number = 12;
  show_count: number = 0;
  selectedPage: number;
  requested_by: string = 'player';

  requestList: FootRequestContext[] | FootPlayerRequestContext[] = [];

  constructor(
    public dialog: MatDialog,
    private footRequestService: FootRequestService
  ) {}

  ngOnDestroy() {}

  // MatualFootmates
  openDialog(foot_request: any): void {
    const dialogRef = this.dialog.open(MutualFootmateComponent, {
      width: '40%',
      panelClass: 'MatualFootmate',
      data: { id: foot_request.user_id }
    });
  }
  ngOnInit() {
    this.getFootRequestList(this.pageSize, 1);
    this.getConnectionStats({});
  }

  getFootRequestList(page_size: number, page_no: number) {
    this.footRequestService
      .getFootRequestList({ page_size, page_no })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
          }
          this.requestList = records;
          this.show_count = response.data.records.length;
          this.foot_data.footmate_requests = response.data.total;
          this.selectedPage = page_no;
        },
        error => {}
      );
  }

  acceptFootRequest(footRequest: FootRequestContext) {
    this.footRequestService
      .acceptFootRequest({ request_id: footRequest.request_id })
      .pipe(untilDestroyed(this))
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
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          footRequest.hide = true;
          footRequest.accepted = false;
        },
        error => {}
      );
  }
  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.manageRequest(this.requested_by, this.selectedPage);
  }

  getConnectionStats(data: object) {
    this.foot_data = data;
  }

  getFootPlayerRequestList(
    page_size: number,
    page_no: number,
    requested_by: string
  ) {
    this.footRequestService
      .getFootPlayerRequestList({ page_size, page_no, requested_by })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
          }
          this.requestList = records;
          this.show_count = response.data.records.length;
          this.foot_data.footmate_requests = response.data.total;
          this.selectedPage = page_no;
        },
        error => {}
      );
  }

  acceptFootPlayerRequest(footPlayerRequest: FootPlayerRequestContext) {
    this.footRequestService
      .acceptFootPlayerRequest({
        user_id: footPlayerRequest.user_id
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          footPlayerRequest.hide = true;
          footPlayerRequest.accepted = true;
        },
        error => {}
      );
  }
  rejectFootPlayerRequest(footPlayerRequest: FootPlayerRequestContext) {
    this.footRequestService
      .rejectFootPlayerRequest({
        user_id: footPlayerRequest.user_id
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          footPlayerRequest.hide = true;
          footPlayerRequest.accepted = false;
        },
        error => {}
      );
  }

  getType(type: string) {
    if (this.requested_by === type) return;
    if (type) this.requested_by = type;
    this.manageRequest(this.requested_by, 1);
  }

  manageRequest(type: string, page_no: number) {
    switch (type) {
      case 'player':
        this.getFootRequestList(this.pageSize, page_no);
        break;
      case 'club':
        this.getFootPlayerRequestList(
          this.pageSize,
          page_no,
          this.requested_by
        );
        break;
      case 'academy':
        this.getFootPlayerRequestList(
          this.pageSize,
          page_no,
          this.requested_by
        );
        break;
    }
  }
}
