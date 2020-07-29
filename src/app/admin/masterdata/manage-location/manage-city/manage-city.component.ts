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
  @ViewChild('districtInput', { static: false }) districtInput: ElementRef;
  public tableConfig: ManageCityTableConfig = new ManageCityTableConfig();
  public dataSource = new MatTableDataSource([]);
  addDistrictForm: FormGroup;
  country_id: string;
  state_id: string;
  stateArray: { id: string; name: string }[];
  pageSize: number = 10;
  total_count: number = 0;
  show_count: number = 0;
  editMode: boolean = false;
  districtId: any;
  row: any = {};
  update: any = '';

  // sidebar
  public sideBarToggle: boolean = true;
  selectedPage: any;
  updateSidebar($event: any) {
    this.sideBarToggle = $event;
  }
  constructor(
    private _formBuilder: FormBuilder,
    private _cityService: CityService,
    private _toastrService: ToastrService,
    private _route: ActivatedRoute,
    private _sharedService: SharedService
  ) {
    this.createForm();
    this._route.params.subscribe(params => {
      this.country_id = params['id'];
    });
  }

  ngOnDestroy() {}

  ngOnInit() {
    this.getStateListByCountry();
  }

  blurElement() {
    this.districtInput.nativeElement.blur();
  }

  addDistrict() {
    this.cancelDistrict();
    this._cityService
      .addCity({ ...this.addDistrictForm.value, country_id: this.country_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success(`Success`, 'District added successfully');
          this.addDistrictForm.get('name').reset();
          this.getDistrictListByState(
            this.state_id,
            this.pageSize,
            this.selectedPage
          );
        },
        error => {
          this._toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }
  getStateListByCountry() {
    this._sharedService
      .getStatesListing(this.country_id)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.stateArray = response.data.records;
        },
        error => {}
      );
  }

  loadDistrictList(value: string) {
    this.state_id = value;
    this.getDistrictListByState(value, this.pageSize, 1);
  }

  getDistrictListByState(
    state_id: string,
    page_size: number,
    page_no: number,
    search?: string
  ) {
    this._sharedService
      .getDistrictList(this.country_id, state_id, {
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
    this.getDistrictListByState(
      this.state_id,
      this.pageSize,
      this.selectedPage
    );
  }

  getSearchText(value: string) {
    let filterValue = value;
    this.getDistrictListByState(this.state_id, this.pageSize, 1, filterValue);
  }

  createForm() {
    this.addDistrictForm = this._formBuilder.group({
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
    this.districtId = id;
    this.getDistrictListByState(
      this.state_id,
      this.pageSize,
      this.selectedPage
    );
  }
  updateDistrict(name: any, id: any) {
    if (!name || name == '') {
      return;
    }
    this.editMode = false;
    this.update = 'update';
    setTimeout(() => {
      this.update = '';
    }, 1000);
  }
  cancelDistrict(user?: any) {
    this.editMode = false;
    this.update = 'cancel';
    this.getDistrictListByState(
      this.state_id,
      this.pageSize,
      this.selectedPage
    );
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
    this._cityService
      .updateCity(this.state_id, city_id, this.country_id, body)
      .pipe(untilDestroyed(this))
      .subscribe(
        data => {
          this._toastrService.success(`Success`, 'City updated successfully');
          this.getDistrictListByState(
            this.state_id,
            this.pageSize,
            this.selectedPage
          );
        },
        error => {
          this._toastrService.error(`${error.error.message}`, 'Error');
          this.getDistrictListByState(
            this.state_id,
            this.pageSize,
            this.selectedPage
          );
        }
      );
  }
}
