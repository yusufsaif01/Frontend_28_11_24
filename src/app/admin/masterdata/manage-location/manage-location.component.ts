import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManageLocationTableConfig } from './manage-location-table-conf';
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
  constructor() {}

  ngOnInit() {}
}
