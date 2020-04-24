import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManageCityTableConfig } from './manage-city-table-conf';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@app/admin/service/admin.service';
import { CityService } from './manage-city-service';
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
  editMode: boolean = false;
  cityId: any;
  row: any = {};
  update: any = '';

  // sidebar
  public sideBarToggle: boolean = true;
  selectedPage: any;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private cityService: CityService
  ) {
    this.createForm();
    this.route.params.subscribe(params => {
      this.country_id = params['id'];
    });
  }

  ngOnInit() {
    this.getStateListByCountry();
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
          this.addCityForm.get('name').reset();
          this.getCityListByState(this.state_id, this.pageSize, 1);
        },
        error => {
          console.log('error', error);
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }
  getStateListByCountry() {
    this.adminService
      .getStateListByCountry({ country_id: this.country_id })
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
    this.selectedPage = event.selectedPage;
    this.getCityListByState(this.state_id, this.pageSize, this.selectedPage);
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
  editCity(name: any, id: any) {
    let obj = { name, id };
    this.row = obj;
    console.log(obj);
    this.editMode = true;
    this.cityId = id;
    this.getCityListByState(this.state_id, this.pageSize, this.selectedPage);
  }
  updateCity(name: any, id: any) {
    console.log('NAME N ID', name, id);
    if (!name || name == '') {
      return;
    }
    this.editMode = false;
    this.update = 'update';
    setTimeout(() => {
      this.update = '';
    }, 1000);
  }
  cancelCity(user: any) {
    console.log(user);
    this.editMode = false;
    this.update = 'cancel';
    this.getCityListByState(this.state_id, this.pageSize, this.selectedPage);
  }
  onChange(event: any) {
    console.log(event);
    if (event.id) {
      console.log('UPDATE');
      this.updateStateByCountry(event);
    }
  }
  updateStateByCountry(body: any) {
    let city_id = body.id;
    delete body['id'];
    delete body['serialNumber'];
    this.cityService
      .updateCity(this.state_id, city_id, this.country_id, body)
      .subscribe(
        data => {
          console.log('Update', data);
          this.toastrService.success(
            `${data.message}`,
            'State Updated Successfully'
          );
          this.getCityListByState(
            this.state_id,
            this.pageSize,
            this.selectedPage
          );
        },
        error => {
          console.log(error);
          this.toastrService.error(`${error.error.message}`, 'Error');
          this.getCityListByState(
            this.state_id,
            this.pageSize,
            this.selectedPage
          );
        }
      );
  }
}
