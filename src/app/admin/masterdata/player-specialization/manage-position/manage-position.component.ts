import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManagePositionTableConfig } from './manage-position-table.conf';
import { AddEditPopupComponent } from './add-edit-popup/add-edit-popup.component';

@Component({
  selector: 'app-manage-position',
  templateUrl: './manage-position.component.html',
  styleUrls: ['./manage-position.component.scss']
})
export class ManagePositionComponent implements OnInit {
  // table config
  public tableConfig: ManagePositionTableConfig = new ManagePositionTableConfig();
  public dataSource = new MatTableDataSource([]);

  // sidebar
  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }

  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditPopupComponent, {
      width: '50%'
    });
  }

  ngOnInit() {}
}
