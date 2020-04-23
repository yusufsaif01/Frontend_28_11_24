import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManageStateTableConfig } from './manage-state-table-conf';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '@app/admin/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
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
  country_id: string;

  // sidebar
  public sideBarToggle: boolean = true;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {
    this.createForm();
    this.route.params.subscribe(params => {
      this.country_id = params['id'];
    });
  }
  ngOnInit() {
    this.getStateByCountry(this.country_id);
  }
  addState() {
    this.adminService
      .addState({ ...this.addStateForm.value, country_id: this.country_id })
      .subscribe(
        response => {
          console.log('server response', response);
          this.toastrService.success(
            `${response.message}`,
            'State Added Successfully'
          );
          this.addStateForm.reset();
          this.getStateByCountry(this.country_id);
        },
        error => {
          console.log('error', error);
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }
  getStateByCountry(country_id: string) {
    this.adminService.getStateByCountry({ country_id }).subscribe(
      response => {
        console.log('response', response);
        let records = response.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i]['serialNumber'] = i + 1;
        }
        this.dataSource = new MatTableDataSource(records);
      },
      error => {
        console.log('error', error);
      }
    );
  }

  createForm() {
    this.addStateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]]
    });
  }
}
