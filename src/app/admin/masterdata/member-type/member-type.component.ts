import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MemberTypeTableConfig } from './member-type-table-conf';
import { AdminService } from '@app/admin/admin.service';
import { untilDestroyed } from '@app/core';
@Component({
  selector: 'app-member-type',
  templateUrl: './member-type.component.html',
  styleUrls: ['./member-type.component.scss']
})
export class MemberTypeComponent implements OnInit, OnDestroy {
  // table config
  public tableConfig: MemberTypeTableConfig = new MemberTypeTableConfig();
  public dataSource = new MatTableDataSource([]);

  // sidebar
  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  constructor(private adminService: AdminService) {}

  ngOnDestroy() {}

  ngOnInit() {
    this.getMemberTypeList();
  }

  getMemberTypeList() {
    this.adminService
      .getMemberTypeList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data;
          for (let i = 0; i < records.length; i++) {
            records[i]['serialNumber'] = i + 1;
          }
          this.dataSource = new MatTableDataSource(records);
        },
        error => {}
      );
  }
}
