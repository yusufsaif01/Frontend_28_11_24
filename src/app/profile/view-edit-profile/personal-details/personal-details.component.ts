import { Component, OnInit } from '@angular/core';
import { ViewEditProfileService } from '../view-edit-profile.service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { SharedService } from '@app/shared/shared.service';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  member_type: string = localStorage.getItem('member_type') || 'player';
  currentYear = new Date().getFullYear();
  tomorrow = new Date();
  countryArray: any[] = [];
  stateArray: any[] = [];
  cityArray: any[] = [];
  profile: any = {};
  personalProfileDetailsForm: FormGroup;
  profile_status: string;
  constructor(
    private _editProfileService: ViewEditProfileService,
    private _sharedService: SharedService,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder
  ) {
    this.createForm();
    this.manageCommonControls();
    this.setCategoryValidators();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }
  createForm() {
    this.personalProfileDetailsForm = this._formBuilder.group({
      bio: ['', [Validators.maxLength(1000)]],
      facebook: [''],
      twitter: [''],
      instagram: [''],
      youtube: [''],
      linked_in: ['']
    });

    if (this.member_type === 'player') {
      this.personalProfileDetailsForm = this._formBuilder.group({
        player_type: ['', [Validators.required]],
        first_name: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
          ]
        ],
        last_name: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
          ]
        ],
        dob: ['', [Validators.required]], //2020-04-14T18:30:00.000Z"
        height_feet: ['', []],
        height_inches: ['', []],
        weight: ['', [Validators.min(1), Validators.pattern(/^\d+(\.\d)?$/)]],
        school: ['', []],
        university: [''],
        college: ['']
      });
    } else if (this.member_type === 'club') {
      this.personalProfileDetailsForm = this._formBuilder.group({
        top_signings: this._formBuilder.array([], [])
      });
    } else if (this.member_type === 'academy') {
      this.personalProfileDetailsForm = this._formBuilder.group({
        number: ['']
      });
    }
  }
  setCategoryValidators() {
    if (this.member_type === 'player') {
      this.setPlayerValidators();
    } else if (this.member_type === 'club' || this.member_type === 'academy') {
      const address = this.personalProfileDetailsForm.get('address');
      const pincode = this.personalProfileDetailsForm.get('pincode');
      const trophies = this.personalProfileDetailsForm.get('trophies');
      const leagueOther = this.personalProfileDetailsForm.get('league_other');
      const documentNumber = this.personalProfileDetailsForm.get('number');

      if (this.member_type === 'club') {
        address.setValidators(null);
        pincode.setValidators([Validators.pattern(/^\d+$/)]);
      }

      if (this.member_type === 'academy') {
        address.setValidators([Validators.required]);
        pincode.setValidators([
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]);
      }
      address.updateValueAndValidity();
      pincode.updateValueAndValidity();
    }
  }
  setPlayerValidators() {
    let heightControl = {
      height_feet: [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
        Validators.pattern(/^\d+$/)
      ],
      height_inches: [
        Validators.required,
        Validators.min(0),
        Validators.max(12),
        Validators.pattern(/^\d+$/)
      ]
    };

    this.personalProfileDetailsForm
      .get('player_type')
      .valueChanges.subscribe(player_type => {
        if (player_type === 'amateur' || player_type === 'professional') {
          this.checkRequiredValidator(
            heightControl,
            heightControl.height_feet,
            1
          );
          this.checkRequiredValidator(
            heightControl,
            heightControl.height_inches,
            1
          );
          this.setControlValidation(
            this.personalProfileDetailsForm,
            heightControl
          );
        }
        if (player_type === 'grassroot') {
          this.checkRequiredValidator(
            heightControl,
            heightControl.height_feet,
            2
          );
          this.checkRequiredValidator(
            heightControl,
            heightControl.height_inches,
            2
          );
          this.setControlValidation(
            this.personalProfileDetailsForm,
            heightControl
          );
        }
      });
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
  checkRequiredValidator(controlname: any, paramname: any, type: number) {
    if (type === 1)
      paramname.includes(Validators.required)
        ? controlname
        : paramname.push(Validators.required);
    else if (type === 2)
      paramname.includes(Validators.required)
        ? paramname.splice(paramname.findIndex(Validators.required), 1)
        : controlname;
  }
  ngOnInit() {
    this.getLocationStats();
    this.getPersonalProfileDetails();
  }
  getPersonalProfileDetails() {
    this._editProfileService
      .getPersonalProfileDetails()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success(
            'Successful',
            'Data retrieved successfully'
          );
          this.profile = response.data;
          this.profile_status = this.profile.profile_status.status;
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }
  formControlAdder(
    form: FormGroup,
    controls: { name: string; abstractControl: AbstractControl }[]
  ) {
    controls.forEach(control => {
      form.addControl(control.name, control.abstractControl);
    });
  }
  manageCommonControls() {
    let commonControls = [
      {
        name: 'country',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'state',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'city',
        abstractControl: this._formBuilder.control('', [Validators.required])
      }
    ];
    this.formControlAdder(this.personalProfileDetailsForm, commonControls);
    if (this.member_type == 'academy' || this.member_type === 'club') {
      let clubAcadCommonControls = [
        {
          name: 'name',
          abstractControl: this._formBuilder.control('', [
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
          ])
        },
        {
          name: 'short_name',
          abstractControl: this._formBuilder.control('', [])
        },
        {
          name: 'founded_in',
          abstractControl: this._formBuilder.control('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.max(this.currentYear),
            Validators.pattern(/^\d+$/)
          ])
        },
        {
          name: 'phone',
          abstractControl: this._formBuilder.control('', [
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ])
        },
        {
          name: 'mobile_number',
          abstractControl: this._formBuilder.control('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ])
        },
        {
          name: 'stadium_name',
          abstractControl: this._formBuilder.control('', [])
        },
        {
          name: 'type',
          abstractControl: this._formBuilder.control('', [Validators.required])
        },
        {
          name: 'address',
          abstractControl: this._formBuilder.control('')
        },
        {
          name: 'pincode',
          abstractControl: this._formBuilder.control('')
        }
      ];
      this.formControlAdder(
        this.personalProfileDetailsForm,
        clubAcadCommonControls
      );
    } else if (this.member_type == 'player') {
      let playerControls = [
        {
          name: 'phone',
          abstractControl: this._formBuilder.control('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ])
        }
      ];
      this.formControlAdder(this.personalProfileDetailsForm, playerControls);
    }
  }
  getLocationStats() {
    this._sharedService
      .getLocationStats()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.countryArray = response.data;
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

  getCitiesListing(countryID: string, stateID: string) {
    this._sharedService
      .getCitiesListing(countryID, stateID)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          this.cityArray = response.data.records;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  onSelectCountry(event: any) {
    if (!event.target.value) {
      this.resetStateCity();
    } else {
      this.getStatesListing(event.target.value);
    }
  }

  resetStateCity() {
    this.stateArray = [];
    this.cityArray = [];
    this.personalProfileDetailsForm.controls.state.patchValue('');
    this.personalProfileDetailsForm.controls.city.patchValue('');
  }

  onSelectState(event: any) {
    if (!event.target.value) {
      this.resetCity();
    } else {
      this.getCitiesListing(
        this.personalProfileDetailsForm.controls.country.value,
        event.target.value
      );
    }
  }
  resetCity() {
    this.cityArray = [];
    this.personalProfileDetailsForm.controls.city.patchValue('');
  }
  updatePersonalProfileDetails() {
    let body: any = {};
    this._editProfileService
      .updatePersonalProfileDetails(body)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success(
            'Successful',
            'Profile updated successfully'
          );
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  ngOnDestroy() {}
}
