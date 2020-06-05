import { Component, OnInit, OnDestroy } from '@angular/core';
import { FootPlayerTableConfig } from './foot-player-table-conf';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import { environment } from '@env/environment';
import { FootPlayerService } from './foot-player.service';
import { untilDestroyed } from '@app/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { ToastrService } from 'ngx-toastr';
import { AddFootplayerComponent } from '../add-footplayer/add-footplayer.component';

@Component({
  selector: 'app-foot-player',
  templateUrl: './foot-player.component.html',
  styleUrls: ['./foot-player.component.scss']
})
export class FootPlayerComponent implements OnInit, OnDestroy {
  // TABLE CONFIG
  public tableConfig: FootPlayerTableConfig = new FootPlayerTableConfig();
  public dataSource = new MatTableDataSource([]);
  pageSize: number = 10;
  selectedPage: number = 1;
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

  constructor(
    private _footPlayerService: FootPlayerService,
    public dialog: MatDialog,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getFootPlayerList(this.pageSize, 1);
  }

  ngOnDestroy() {}

  updatePage(event: any) {
    this.selectedPage = event.selectedPage;
    this.getFootPlayerList(this.pageSize, event.selectedPage);
  }

  getFootPlayerList(page_size: number, page_no: number, search?: string) {
    this._footPlayerService
      .getFootPlayerList({ page_no, page_size, search })
      .pipe(untilDestroyed(this))
      .subscribe(response => {
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
        }
        this.dataSource = new MatTableDataSource(response.data.records);
        this.show_count = response.data.records.length;
        this.total_count = response.data.total;
      });
  }
  applyFilter(event: any) {
    let filterValue = event.target.value;
    this.getFootPlayerList(this.pageSize, 1, filterValue);
  }

  // AddPlayerPopUp
  onaddfootplayer(): void {
    const dialogRef = this.dialog.open(AddFootplayerComponent, {
      width: '99%'
    });
  }
  // delete
  deletePopup(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '40% ',
      panelClass: 'filterDialog',
      data: {
        message: 'Are you sure you want to delete?',
        acceptText: 'Yes',
        rejectText: 'No'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._footPlayerService
          .deleteFootPlayer(id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                `Success`,
                'FootPlayer deleted successfully'
              );
              this.getFootPlayerList(this.pageSize, 1);
            },
            error => {
              // log.debug(`Login error: ${error}`);

              this._toastrService.error(
                `${error.error.message}`,
                'Delete Footplayer'
              );
            }
          );
      }
    });
  }
}
