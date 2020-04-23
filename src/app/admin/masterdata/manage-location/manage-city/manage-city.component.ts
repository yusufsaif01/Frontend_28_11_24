import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManageCityTableConfig } from './manage-city-table-conf';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@app/admin/service/admin.service';
@Component({
  selector: 'app-manage-city',
  templateUrl: './manage-city.component.html',
  styleUrls: ['./manage-city.component.scss']
})
export class ManageCityComponent implements OnInit {
  // table config
  public tableConfig: ManageCityTableConfig = new ManageCityTableConfig();
  public dataSource = new MatTableDataSource([]);
  addCityForm: FormGroup;
  country_id: string;
  state_id: string;
  stateArray: { id: string; name: string }[];
  pageSize: number = 10;
  total_count: number;

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
    this.getStateList();
  }
  addCity() {
    this.adminService
      .addCity({ ...this.addCityForm.value, country_id: this.country_id })
      .subscribe(
        response => {
          console.log('server response', response);
          this.toastrService.success(
            `${response.message}`,
            'City Added Successfully'
          );
          this.addCityForm.reset();
          this.getStateList();
          this.dataSource = new MatTableDataSource([]);
        },
        error => {
          console.log('error', error);
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }
  getStateList() {
    this.adminService
      .getStateByCountry({ country_id: this.country_id })
      .subscribe(
        response => {
          console.log('response', response.data.records);
          this.stateArray = response.data.records;
        },
        error => {
          console.log('error', error);
        }
      );
  }

  loadCityList(value: string) {
    this.state_id = value;
    this.getCityListByState(value, this.pageSize, 1);
  }

  getCityListByState(
    state_id: string,
    page_size: number,
    page_no: number,
    search?: string
  ) {
    this.adminService
      .getCityListByState({
        country_id: this.country_id,
        state_id,
        page_no,
        page_size,
        search
      })
      .subscribe(
        response => {
          console.log('response', response);
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            if (page_no > 1) {
              records[i]['serialNumber'] =
                i + 1 + page_size * page_no - page_size;
            } else {
              records[i]['serialNumber'] = i + 1;
            }
          }
          this.total_count = response.data.total;
          this.dataSource = new MatTableDataSource(records);
        },
        error => {
          console.log('error', error);
        }
      );
  }

  updatePage(event: any) {
    this.getCityListByState(this.state_id, this.pageSize, event.selectedPage);
  }
  applyFilter(event: any) {
    let filterValue = event.target.value;
    this.getCityListByState(this.state_id, this.pageSize, 1, filterValue);
  }

  createForm() {
    this.addCityForm = this.formBuilder.group({
      state_id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]]
    });
  }
}
