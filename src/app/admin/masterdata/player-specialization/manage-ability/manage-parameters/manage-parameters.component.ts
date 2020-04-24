import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageParameterTableConfig } from './manage-parameter-table-conf';
import { AddpopupComponent } from '../addpopup/addpopup.component';
@Component({
  selector: 'app-manage-parameters',
  templateUrl: './manage-parameters.component.html',
  styleUrls: ['./manage-parameters.component.scss']
})
export class ManageParametersComponent implements OnInit {
  // table config
  public tableConfig: ManageParameterTableConfig = new ManageParameterTableConfig();
  public dataSource = new MatTableDataSource([]);

  // sidebar
  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  // Add Popup
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddpopupComponent, {
      width: '40%'
    });
  }
  ngOnInit() {}
}
