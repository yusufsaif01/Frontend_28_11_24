import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ManageParameterTableConfig } from './manage-parameter-table-conf';
import { AddpopupComponent } from '../../addpopup/addpopup.component';
import { AdminService } from '@app/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-manage-parameters',
  templateUrl: './manage-parameters.component.html',
  styleUrls: ['./manage-parameters.component.scss']
})
export class ManageParametersComponent implements OnInit, OnDestroy {
  // table config
  public tableConfig: ManageParameterTableConfig = new ManageParameterTableConfig();
  public dataSource = new MatTableDataSource([]);
  editMode: boolean = false;
  parameterId: any;
  abilityId: string;
  abilityName: string = 'Loading...';
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
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.abilityId = params['id'];
    });
  }

  ngOnDestroy() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddpopupComponent, {
      width: '40%',
      data: { specialization: 'parameter', ability_id: this.abilityId },
      autoFocus: false
    });
    this.editMode = false;
    this.update = 'cancel';

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getParameterListByAbility(this.abilityId);
      }
    });
  }
  ngOnInit() {
    this.getParameterListByAbility(this.abilityId);
  }

  getParameterListByAbility(ability_id: string) {
    this.adminService
      .getParameterListByAbility({ ability_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.abilityName = response.data.ability;
          let records = response.data.records;
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
      .pipe(untilDestroyed(this))
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
