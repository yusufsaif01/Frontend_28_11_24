import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddCenterTableConfig } from './add-center-table-conf';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';
import { TraningCenterService } from '../traning-center.service';
import { AuthenticationService, untilDestroyed } from '@app/core';
import { SharedService } from '@app/shared/shared.service';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged } from 'rxjs/operators';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
let pincodeControl = {
  pincode: [Validators.required, Validators.pattern(/^\d+$/)]
};
let addressControl = {
  address: [Validators.required]
};

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.component.html',
  styleUrls: ['./add-center.component.scss'],
  providers: [CapitalizePipe]
})
export class AddCenterComponent implements OnInit, OnDestroy {
  // TABLE CONFIG
  public tableConfig: AddCenterTableConfig = new AddCenterTableConfig();
  public dataSource = new MatTableDataSource([]);
  dropdownList = [];
  selectedItems = [];
  member_type: string = localStorage.getItem('member_type') || 'coache';
  dropdownSettings: IDropdownSettings;
  countryArray: any[] = [];
  coacheArray: any[] = [];
  stateArray: any[] = [];
  districtArray: any[] = [];
  own_member_type: string;
  create_registration_Form: FormGroup;
  environment = environment;

  show_count: number;
  total_count: number;
  pageSize: number = 5;
  selectedPage: number = 1;
  totalRecordSubject$ = new Subject();
  daysSelect: any[] = [];
  constructor(
    private _authenticationService: AuthenticationService,
    private _sharedService: SharedService,
    private _traningCenterService: TraningCenterService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddCenterComponent>,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private capitalize?: CapitalizePipe
  ) {
    this.createForm();
    this.own_member_type = data.member_type;
  }
  ngOnDestroy() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    const academy_id = localStorage.getItem('user_id');
    this.getLocationStats();
    this.getcoacheStats(academy_id);
    this.dropdownList = [
      { item_id: 1, item_text: 'Sunday' },
      { item_id: 2, item_text: 'Monday' },
      { item_id: 3, item_text: 'Tuesday' },
      { item_id: 4, item_text: 'Wednesday' },
      { item_id: 5, item_text: 'Thursday' },
      { item_id: 6, item_text: 'Friday' },
      { item_id: 7, item_text: 'Saturday' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    this.daysSelect.push(item);

    console.log('on item select ==>');

    console.log(this.daysSelect);
  }
  onSelectAll(items: any) {
    console.log('on item select All ==>');
    console.log(items);
  }

  prepareResponse(records: any) {
    records.forEach((element: any) => {
      element.player_name = {
        name: element.name,
        profileUrl:
          environment.mediaUrl + '/member/profile/public/' + element.user_id
      };
    });
    return records;
  }

  sendFootPlayerRequest(user_id: string) {
    this._traningCenterService
      .sendFootPlayerRequest({ to: user_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success(`Success`, 'Send request successfully');
          this.dialogRef.close(true);
        },
        error => {
          this._toastrService.error(
            `${error.error.message}`,
            'Request Footplayer'
          );
        }
      );
  }

  getStateToolTip(
    is_verified: boolean,
    club_name: string,
    member_type: string,
    status: string
  ) {
    if (status === 'pending') {
      return {
        message: 'Add request sent',
        state: true
      };
    } else if (['club', 'academy'].includes(member_type)) {
      return { message: 'These details are for club/ academy', state: true };
    } else if (
      is_verified &&
      (!club_name || this.own_member_type == 'academy')
    ) {
      return { message: 'Add', state: false };
    } else if (is_verified && club_name) {
      return {
        message: `This player is already a member of ${this.capitalize.transform(
          club_name
        )}`,
        state: true
      };
    } else if (!is_verified) {
      return {
        message: 'These details are for not-verified player',
        state: true
      };
    }
  }

  setControlValidation(
    form: FormGroup,
    controlObject: { [name: string]: ValidatorFn[] }
  ) {
    for (const name in controlObject) {
      let controlName = form.get(name);
      controlName.setValidators(controlObject[name]);
      controlName.updateValueAndValidity();
    }
  }
  checkRequiredValidator(
    form: FormGroup,
    controlObject: { [name: string]: ValidatorFn[] },
    require: boolean
  ) {
    const [name] = Object.keys(controlObject);

    let controlName = form.get(name);
    let validationArray = controlObject[name];
    if (require) {
      validationArray = [
        ...new Set([...controlObject[name], Validators.required])
      ];
    } else {
      validationArray = validationArray.filter(
        validator => validator !== Validators.required
      );
    }

    controlName.setValidators(validationArray);
    controlName.updateValueAndValidity();
  }
  //location api

  getLocationStats() {
    this._sharedService
      .getLocationStats()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.countryArray = response.data;
          console.log('country list iss');
          console.log(response.data);
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  getStatesListing(countryID: string) {
    this._sharedService
      .getStatesListing(countryID)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.stateArray = response.data.records;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  getDistrictsListing(countryID: string, stateID: string) {
    this._sharedService
      .getDistrictsList(countryID, stateID, { page_size: 85 })
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.districtArray = response.data.records;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  //Get coache list

  getcoacheStats(id: any) {
    this._sharedService
      .getcoacheList(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.coacheArray = response.data.map(data => data.send_to.name);
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  onSelectCountry(event: any) {
    if (!event.target.value) {
      this.resetStateDistrict();
    } else {
      this.getStatesListing(event.target.value);
    }
  }

  resetStateDistrict() {
    this.stateArray = [];
    this.districtArray = [];
    this.create_registration_Form.controls.state.patchValue('');
    this.create_registration_Form.controls.district.patchValue('');
  }

  onSelectState(event: any) {
    if (!event.target.value) {
      this.resetDistrict();
    } else {
      this.getDistrictsListing(
        this.create_registration_Form.controls.country.value,
        event.target.value
      );
    }
  }
  resetDistrict() {
    this.districtArray = [];
    this.create_registration_Form.controls.district.patchValue('');
  }

  create_center() {
    let form_data = this.create_registration_Form.value;
    form_data.academy_user_id = localStorage.getItem('user_id');
    //form_data.opening_days = this.daysSelect;
    var names = this.daysSelect.map(function(item) {
      return item['item_text'];
    });
    console.log('namesss', names);
    const daystring = names.toString();
    form_data.opening_days = daystring;

    console.log('days select in create_center function is', this.daysSelect);
    console.log('form data is ==>', form_data);
    this._authenticationService
      .create_traning_center(form_data)
      .pipe(untilDestroyed(this))
      .subscribe(
        credentials => {
          this.dialogRef.close('refresh');
        },
        error => {
          this._toastrService.error(`${error.error.message}`, 'Failed');
        }
      );
  }
  setCategoryValidators() {
    if (['club', 'academy'].includes(this.member_type)) {
      if (this.member_type === 'club') {
        this.checkRequiredValidator(
          this.create_registration_Form,
          { pincode: pincodeControl.pincode },
          false
        );
      }

      if (this.member_type === 'academy') {
        this.setControlValidation(
          this.create_registration_Form,
          addressControl
        );
        this.setControlValidation(
          this.create_registration_Form,
          pincodeControl
        );
      }
    }
  }
  createForm() {
    this.create_registration_Form = this._formBuilder.group({
      traning_center_name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
        ]
      ],
      start_time: [''],
      end_time: [''],
      country: [''],
      state: [''],
      district: [''],
      full_address: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
        ]
      ],
      pincode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      coache_name: ['', [Validators.required]]
    });
  }
}
