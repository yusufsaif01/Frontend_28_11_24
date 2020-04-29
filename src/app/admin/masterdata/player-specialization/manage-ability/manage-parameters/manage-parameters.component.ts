import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageParameterTableConfig } from './manage-parameter-table-conf';
import { AddpopupComponent } from '../../addpopup/addpopup.component';
import { AdminService } from '@app/admin/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '@app/admin/service/shared.service';
@Component({
  selector: 'app-manage-parameters',
  templateUrl: './manage-parameters.component.html',
  styleUrls: ['./manage-parameters.component.scss']
})
export class ManageParametersComponent implements OnInit {
  // table config
  public tableConfig: ManageParameterTableConfig = new ManageParameterTableConfig();
  public dataSource = new MatTableDataSource([]);
  editMode: boolean = false;
  parameterId: any;
  abilityId: string;
  abilityName: string;
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
    public toastrService: ToastrService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {
    this.route.params.subscribe(params => {
      this.abilityId = params['id'];
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddpopupComponent, {
      width: '40%',
      data: { specialization: 'parameter', ability_id: this.abilityId }
    });
    this.cancelParameter();

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getParameterListByAbility(this.abilityId);
      }
    });
  }
  ngOnInit() {
    this.getParameterListByAbility(this.abilityId);
    this.abilityName = this.sharedService.abilityName;
  }

  getParameterListByAbility(ability_id: string) {
    this.adminService.getParameterListByAbility({ ability_id }).subscribe(
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
  editParameter(name: any, id: any) {
    let obj = { name, id };
    this.row = obj;
    this.editMode = true;
    this.parameterId = id;
    // this.getAbilityList();
  }
  updateParameter(name: any, id: any) {
    if (!name || name == '') {
      return;
    }
    this.editMode = false;
    this.update = 'update';
    setTimeout(() => {
      this.update = '';
    }, 1000);
  }
  cancelParameter(user?: any) {
    this.editMode = false;
    this.update = 'cancel';
    this.getParameterListByAbility(this.abilityId);
  }
  onChange(event: any) {
    if (event.id) {
      this.updateParameterById(event);
    }
  }
  updateParameterById(body: { id: string; name: string }) {
    const { id, name } = body;
    delete body['serialNumber'];
    this.adminService
      .updateParameterById({
        name: name,
        ability_id: this.abilityId,
        parameter_id: id
      })
      .subscribe(
        data => {
          this.toastrService.success(
            `${data.message}`,
            'Parameter Updated Successfully'
          );
          this.getParameterListByAbility(this.abilityId);
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
          this.getParameterListByAbility(this.abilityId);
        }
      );
  }
}
