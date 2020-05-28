import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ManageCityTableConfig } from './manage-city-table-conf';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@app/admin/admin.service';
import { CityService } from './manage-city-service';
import { untilDestroyed } from '@app/core';
import { SharedService } from '@app/shared/shared.service';
@Component({
  selector: 'app-manage-city',
  templateUrl: './manage-city.component.html',
  styleUrls: ['./manage-city.component.scss']
})
export class ManageCityComponent implements OnInit, OnDestroy {
  // table config
  @ViewChild('cityInput', { static: false }) cityInput: ElementRef;
  public tableConfig: ManageCityTableConfig = new ManageCityTableConfig();
  public dataSource = new MatTableDataSource([]);
  addCityForm: FormGroup;
  country_id: string;
  state_id: string;
  stateArray: { id: string; name: string }[];
  pageSize: number = 10;
  total_count: number = 0;
  show_count: number = 0;
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
    private cityService: CityService,
    private sharedService: SharedService
  ) {
    this.createForm();
    this.route.params.subscribe(params => {
      this.country_id = params['id'];
    });
  }

  ngOnDestroy() {}

  ngOnInit() {
    this.getStateListByCountry();
  }

  blurElement() {
    this.cityInput.nativeElement.blur();
  }

  addCity() {
    this.cancelCity();
    this.adminService
      .addCity({ ...this.addCityForm.value, country_id: this.country_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.toastrService.success(
            `${response.message}`,
            'City Added Successfully'
          );
          this.addCityForm.get('name').reset();
          this.getCityListByState(
            this.state_id,
            this.pageSize,
            this.selectedPage
          );
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }
  getStateListByCountry() {
    this.sharedService
      .getStatesListing(this.country_id)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.stateArray = response.data.records;
        },
        error => {}
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
    this.sharedService
      .getCitiesListing(this.country_id, state_id, {
        page_no,
        page_size,
        search
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          this.total_count = response.data.total;
          this.show_count = response.data.records.length;
          this.dataSource = new MatTableDataSource(records);
        },
        error => {
          if (error.status === 404)
            this.dataSource = new MatTableDataSource([]);
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
      name: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9\&\- ]+$/)]
      ]
    });
  }
  editCity(name: any, id: any) {
    let obj = { name, id };
    this.row = obj;
    this.editMode = true;
    this.cityId = id;
    this.getCityListByState(this.state_id, this.pageSize, this.selectedPage);
  }
  updateCity(name: any, id: any) {
    if (!name || name == '') {
      return;
    }
    this.editMode = false;
    this.update = 'update';
    setTimeout(() => {
      this.update = '';
    }, 1000);
  }
  cancelCity(user?: any) {
    this.editMode = false;
    this.update = 'cancel';
    this.getCityListByState(this.state_id, this.pageSize, this.selectedPage);
  }
  onChange(event: any) {
    if (event.id) {
      this.updateStateByCountry(event);
    }
  }
  updateStateByCountry(body: any) {
    let city_id = body.id;
    delete body['id'];
    delete body['serialNumber'];
    this.cityService
      .updateCity(this.state_id, city_id, this.country_id, body)
      .pipe(untilDestroyed(this))
      .subscribe(
        data => {
          this.toastrService.success(
            `${data.message}`,
            'City Updated Successfully'
          );
          this.getCityListByState(
            this.state_id,
            this.pageSize,
            this.selectedPage
          );
        },
        error => {
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
