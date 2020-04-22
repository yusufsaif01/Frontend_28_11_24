import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MemberTypeTableConfig } from './member-type-table-conf';
@Component({
  selector: 'app-member-type',
  templateUrl: './member-type.component.html',
  styleUrls: ['./member-type.component.scss']
})
export class MemberTypeComponent implements OnInit {
  // table config
  public tableConfig: MemberTypeTableConfig = new MemberTypeTableConfig();
  public dataSource = new MatTableDataSource([]);

  // sidebar
  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  constructor() {}

  ngOnInit() {}
}
