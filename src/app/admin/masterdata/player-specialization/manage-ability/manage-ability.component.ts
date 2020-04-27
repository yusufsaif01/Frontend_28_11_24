import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageAbilityTableConfig } from './manage-ability-table.conf';
import { AddpopupComponent } from './addpopup/addpopup.component';
import { AdminService } from '@app/admin/service/admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-ability',
  templateUrl: './manage-ability.component.html',
  styleUrls: ['./manage-ability.component.scss']
})
export class ManageAbilityComponent implements OnInit {
  // table config
  public tableConfig: ManageAbilityTableConfig = new ManageAbilityTableConfig();
  public dataSource = new MatTableDataSource([]);
  editMode: boolean = false;
  abilityId: any;
  row: any = {};
  update: any = '';

  // sidebar
  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  // Add Popup
  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    public toastrService: ToastrService
  ) {}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddpopupComponent, {
      width: '40%',
      autoFocus: false
    });

    this.cancelAbility();

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getAbilityList();
      }
    });
  }

  ngOnInit() {
    this.getAbilityList();
  }
  getAbilityList() {
    this.adminService.getAbilityList().subscribe(
      response => {
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i]['serialNumber'] = i + 1;
        }
        this.dataSource = new MatTableDataSource(records);
      },
      error => {}
    );
  }

  editAbility(name: any, id: any) {
    let obj = { name, id };
    this.row = obj;
    this.editMode = true;
    this.abilityId = id;
    // this.getAbilityList();
  }
  updateAbility(name: any, id: any) {
    if (!name || name == '') {
      return;
    }
    this.editMode = false;
    this.update = 'update';
    setTimeout(() => {
      this.update = '';
    }, 1000);
  }
  cancelAbility(user?: any) {
    this.editMode = false;
    this.update = 'cancel';
    this.getAbilityList();
  }
  onChange(event: any) {
    if (event.id) {
      this.updateAbilityById(event);
    }
  }
  updateAbilityById(body: any) {
    delete body['serialNumber'];
    this.adminService.updateAbilityById(body).subscribe(
      data => {
        this.toastrService.success(
          `${data.message}`,
          'Ability Updated Successfully'
        );
        this.getAbilityList();
      },
      error => {
        this.toastrService.error(`${error.error.message}`, 'Error');
        this.getAbilityList();
      }
    );
  }
}
