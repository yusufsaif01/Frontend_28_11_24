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
        console.log(response);
        let records = response.data;
        for (let i = 0; i < records.length; i++) {
          records[i]['serialNo'] = i + 1;
        }
        this.dataSource = new MatTableDataSource(records);
      },
      error => {
        console.log(error);
      }
    );
  }
}
