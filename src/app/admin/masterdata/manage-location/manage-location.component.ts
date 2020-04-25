import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManageLocationTableConfig } from './manage-location-table-conf';
import { AdminService } from '@app/admin/service/admin.service';
@Component({
  selector: 'app-manage-location',
  templateUrl: './manage-location.component.html',
  styleUrls: ['./manage-location.component.scss']
})
export class ManageLocationComponent implements OnInit {
  // table config
  public tableConfig: ManageLocationTableConfig = new ManageLocationTableConfig();
  public dataSource = new MatTableDataSource([]);
  TableOptions: {};

  // sidebar
  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  constructor(public adminService: AdminService) {}
  ngOnInit() {
    this.getLocationStats();
  }

  getLocationStats() {
    this.adminService.getLocationStats().subscribe(
      response => {
        let records = response.data;
        for (let i = 0; i < records.length; i++) {
          records[i]['serialNo'] = i + 1;
        }
        let country_id = response.data[0].country_id;
        this.TableOptions = { country_id };
        this.dataSource = new MatTableDataSource(records);
      },
      error => {}
    );
  }
}
