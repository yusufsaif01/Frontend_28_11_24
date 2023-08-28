import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManageLocationTableConfig } from './manage-location-table-conf';
import { untilDestroyed } from '@app/core';
import { SharedService } from '@app/shared/shared.service';
@Component({
  selector: 'app-manage-location',
  templateUrl: './manage-location.component.html',
  styleUrls: ['./manage-location.component.scss']
})
export class ManageLocationComponent implements OnInit, OnDestroy {
  // table config
  public tableConfig: ManageLocationTableConfig = new ManageLocationTableConfig();
  public dataSource = new MatTableDataSource([]);
  TableOptions: {};

  // sidebar
  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  constructor(public sharedService: SharedService) {}

  ngOnDestroy() {}

  ngOnInit() {
    this.getLocationStats();
  }

  getLocationStats() {
    this.sharedService
      .getLocationStats()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data;
          let country_id = response.data[0].country_id;
          this.TableOptions = { country_id };
          this.dataSource = new MatTableDataSource(records);
        },
        error => {}
      );
  }
}
