import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManagePositionTableConfig } from './manage-position-table.conf';
import { AddEditPopupComponent } from './add-edit-popup/add-edit-popup.component';
import { PositionService } from './manage-position-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-position',
  templateUrl: './manage-position.component.html',
  styleUrls: ['./manage-position.component.scss']
})
export class ManagePositionComponent implements OnInit {
  // table config
  public tableConfig: ManagePositionTableConfig = new ManagePositionTableConfig();
  public dataSource = new MatTableDataSource([]);
  pageSize: number = 10;
  page_no: number = 1;

  // sidebar
  public sideBarToggle: boolean = true;
  position_count: number;
  abilities: any[] = [];
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }

  constructor(
    public dialog: MatDialog,
    private positionService: PositionService,
    private toastrService: ToastrService
  ) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditPopupComponent, {
      width: '50%',
      data: {
        options: { header: 'Add', buttonName: 'Save' },
        abilities: this.abilities
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getPositionListing(this.pageSize, this.page_no);
      }
      this.getAbilitiesList();
    });
  }

  editRow(id: any, name: any, abbreviation: any, abilities: any) {
    let data = { id, name, abbreviation, abilities };
    const dialogRef = this.dialog.open(AddEditPopupComponent, {
      width: '50%',
      data: {
        data,
        options: { header: 'Edit', buttonName: 'Update' },
        abilities: this.abilities
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getPositionListing(this.pageSize, this.page_no);
        console.log(this.abilities);
      }
      this.getAbilitiesList();
    });
  }

  ngOnInit() {
    this.getPositionListing(this.pageSize, this.page_no);
    this.getAbilitiesList();
  }
  getAbilitiesList() {
    this.positionService.getAbilitiesList().subscribe(
      response => {
        this.abilities = response.data.records;
      },
      error => {
        this.toastrService.error(`${error.error.message}`, 'Error');
      }
    );
  }
  getPositionListing(page_size: number, page_no: number) {
    this.positionService
      .getPositionList({
        page_no: page_no,
        page_size: page_size
      })
      .subscribe(
        response => {
          let records = response.data.records;
          this.position_count = response.data.total;
          for (let i = 0; i < records.length; i++) {
            if (page_no > 1) {
              records[i]['serialNo'] = i + 1 + page_size * page_no - page_size;
            } else {
              records[i]['serialNo'] = i + 1;
            }
          }
          this.dataSource = new MatTableDataSource(records);
          console.log(response);
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }
  updatePage(event: any) {
    this.getPositionListing(this.pageSize, event.selectedPage);
  }
}
