import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManageStateTableConfig } from './manage-state-table-conf';
@Component({
  selector: 'app-manage-state',
  templateUrl: './manage-state.component.html',
  styleUrls: ['./manage-state.component.scss']
})
export class ManageStateComponent implements OnInit {
  // table config
  public tableConfig: ManageStateTableConfig = new ManageStateTableConfig();
  public dataSource = new MatTableDataSource([]);

  // sidebar
  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  constructor() {}

  ngOnInit() {}
}
