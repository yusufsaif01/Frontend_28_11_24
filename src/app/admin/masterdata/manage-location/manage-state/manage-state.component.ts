import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManageStateTableConfig } from './manage-state-table-conf';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from '@app/admin/service/admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-state',
  templateUrl: './manage-state.component.html',
  styleUrls: ['./manage-state.component.scss']
})
export class ManageStateComponent implements OnInit {
  // table config
  public tableConfig: ManageStateTableConfig = new ManageStateTableConfig();
  public dataSource = new MatTableDataSource([]);
  addStateForm: FormGroup;

  // sidebar
  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getStateList();
  }
  addState() {
    this.adminService.addState(this.addStateForm.value).subscribe(
      response => {
        console.log('server response', response);
        this.toastrService.success(
          `${response.message}`,
          'State Added Successfully'
        );
        this.getStateList();
      },
      error => {
        console.log('error', error);
        this.toastrService.error(`${error.error.message}`, 'Error');
      }
    );
  }

  getStateList() {
    this.adminService.getStateList().subscribe(
      response => {
        console.log('response', response);
        let records = response.data;
        this.dataSource = new MatTableDataSource(records);
      },
      error => {
        console.log('error', error);
      }
    );
  }

  createForm() {
    this.addStateForm = this.formBuilder.group({
      name: ['']
    });
  }
}
