import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewEditProfileService } from '../view-edit-profile.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { untilDestroyed } from '@app/core';
import { SharedService } from '@app/shared/shared.service';
import { Constants } from '@app/shared/static-data/static-data';
import { DeleteConfirmationComponent } from '@app/shared/dialog-box/delete-confirmation/delete-confirmation.component';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  ValidatorFn
} from '@angular/forms';
import { environment } from '@env/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  DateAdapter,
  MatDatepicker,
  MatDatepickerInputEvent,
  MAT_DATE_FORMATS
} from '@angular/material';
import { DateConversion } from '@app/shared/utilities/date-conversion';
import { AppDateAdapter } from '@app/shared/utilities/format-datepicker';
import { VerificationComponent } from '../verification/verification.component';
import { Router, ActivatedRoute } from '@angular/router';
let pincodeControl = {
  pincode: [Validators.required, Validators.pattern(/^\d+$/)]
};
let addressControl = {
  address: [Validators.required]
};

export function dateFactory() {
  return localStorage.getItem('member_type') === 'player' ||
    localStorage.getItem('member_type') === 'coach'
    ? Constants.PROFILE_DATE_FORMATS.DOB
    : Constants.PROFILE_DATE_FORMATS.FOUNDED;
}

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useFactory: dateFactory },
    DateConversion
  ]
})
export class PersonalDetailsComponent implements OnInit {
  @Input() clubAcademyType = '';
  member_type: string = localStorage.getItem('member_type') || 'player';
  currentYear = new Date().getFullYear();
  today = new Date();
  countryArray: any[] = [];
  stateArray: any[] = [];
  districtArray: any[] = [];
  profile: any = {};
  personalProfileDetailsForm: FormGroup;
  profile_status: string;
  editMode: boolean = false;
  player_type: string = '';
  email: string;
  emailChange: string = '';
  value: string;
  valueForMobile: string;
  @Output() avatar_url = new EventEmitter<string>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _editProfileService: ViewEditProfileService,
    private _sharedService: SharedService,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    private _dateConversion: DateConversion
  ) {
    this.createForm();
    this.manageCommonControls();
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.getPersonalProfileDetails();
    this.getLocationStats();
  }

  sendTheNewValue(event) {
    console.log(event.target.value);
    this.value = event.target.value;
    console.log(event.target.value);
  }
  sendTheNewValueForMobile(event) {
    this.valueForMobile = event.target.value;
    console.log(event.target.value);
  }
  transformURL(url: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  appendURL(url: string): SafeHtml {
    if (url.includes('http')) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(`https://${url}`);
  }
  toggleMode() {
    console.log('click on toggleMode button');
    this.editMode = !this.editMode;
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      panelClass: 'deletepopup',
      data: {
        message: 'Are you sure you want to delete Your Account?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const user_id = localStorage.getItem('user_id');
        this._editProfileService
          .deleteAccount(user_id)
          .pipe(untilDestroyed(this))
          .subscribe(
            response => {
              this._toastrService.success(
                `Success`,
                'Account deleted successfully'
              );
              this.router.navigate(
                [this.route.snapshot.queryParams.redirect || '/login'],
                { replaceUrl: true }
              );
            },
            error => {
              this._toastrService.error(
                `${error.error.message}`,
                'Delete Account'
              );
            }
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

  setCategoryValidators() {
    if (['club', 'academy'].includes(this.member_type)) {
      if (this.member_type === 'club') {
        this.checkRequiredValidator(
          this.personalProfileDetailsForm,
          { pincode: pincodeControl.pincode },
          false
        );
      }

      if (this.member_type === 'academy') {
        this.setControlValidation(
          this.personalProfileDetailsForm,
          addressControl
        );
        this.setControlValidation(
          this.personalProfileDetailsForm,
          pincodeControl
        );
      }
    }
  }

  createForm() {
    this.personalProfileDetailsForm = this._formBuilder.group({});
    if (this.member_type === 'player' || this.member_type === 'coach') {
      this.personalProfileDetailsForm = this._formBuilder.group({
        email: [{ value: '' }, [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ]
        ],
        gender: ['', Validators.required],
        first_name: [
          '',
          [
            Validators.required,
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
        dob: ['', { disabled: true }, [Validators.required]], //2020-04-14T18:30:00.000Z"
        bio: ['', [Validators.required]],
        height_feet: [
          '',
          [
            Validators.required,
            Validators.min(1),
            Validators.max(10),
            Validators.pattern(/^\d+$/)
          ]
        ],
        height_inches: [
          '',
          [
            Validators.required,
            Validators.min(0),
            Validators.max(12),
            Validators.pattern(/^\d+$/)
          ]
        ],
        weight: [
          '',
          [
            Validators.required,
            Validators.min(1),
            Validators.max(200),
            Validators.pattern(/^\d+(\.\d)?$/)
          ]
        ],
        school: ['', []],
        university: [''],
        college: ['', []]
      });
    } else {
      this.personalProfileDetailsForm = this._formBuilder.group({
        email: [{ value: '' }, [Validators.required, Validators.email]]
      });
    }
  }

  closeDatePicker(
    elem: MatDatepicker<any>,
    event: MatDatepickerInputEvent<Date>,
    controlName: string
  ) {
    elem.close();
    let year = new Date(String(event));
    this.personalProfileDetailsForm.get(controlName).setValue(year);
  }
  uploadAvatar(files: FileList) {
    const requestData = new FormData();
    requestData.set('avatar', files[0]);
    this._editProfileService
      .updateAvatar(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          if (res.data.avatar_url) {
            this.profile.avatar_url =
              environment.mediaUrl + res.data.avatar_url;
          }
          localStorage.setItem(
            'avatar_url',
            environment.mediaUrl + res.data.avatar_url
          );
          this.avatar_url.emit(localStorage.getItem('avatar_url'));
          this._toastrService.success('Success', 'Avatar updated successfully');
        },
        err => {
          this._toastrService.error('Error', err.error.message);
        }
      );
  }
  getPersonalProfileDetails() {
    this._editProfileService
      .getPersonalProfileDetails()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          // this._toastrService.success(
          // 'Successful',
          // 'Data retrieved successfully'
          // );
          this.profile = response.data;
          console.log('profile response issss=>', this.profile);
          this.populateFormFields(this.profile);
          this.profile_status = this.profile.profile_status.status;
          this.player_type = this.profile.player_type;

          if (this.profile.avatar_url) {
            this.profile.avatar_url = this.profile.avatar_url;
          } else {
            this.profile.avatar_url =
              environment.mediaUrl + '/uploads/avatar/user-avatar.png';
          }

          this.setCategoryValidators();
          //this._toastrService.success(
          // 'Successful',
          // 'Data retrieved successfully'
          // );
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }
  populateFormFields(profileData: any) {
    console.log('populate form fields are==>');
    console.log(profileData);
    this.personalProfileDetailsForm.valueChanges.subscribe(val => {
      // this.player_type = val.player_type;
    });
    this.personalProfileDetailsForm.patchValue(profileData);
    if (this.profile.country_name) {
      this.getStatesListing(this.profile.country_id);
      this.getDistrictsListing(this.profile.country_id, this.profile.state_id);
    }

    this.personalProfileDetailsForm.patchValue({
      country: this.profile.country_name ? this.profile.country_id : '',
      state: this.profile.state_name ? this.profile.state_id : '',
      district: this.profile.district_name ? this.profile.district_id : '',
      height_feet:
        this.profile.height_feet && this.profile.height_feet
          ? this.profile.height_feet
          : '',
      height_inches:
        this.profile.height_inches && this.profile.height_inches
          ? this.profile.height_inches
          : '',
      school:
        this.profile.institute_school && this.profile.institute_school
          ? this.profile.institute_school
          : '',
      university:
        this.profile.institute_university && this.profile.institute_university
          ? this.profile.institute_university
          : '',
      college:
        this.profile.institute_college && this.profile.institute_college
          ? this.profile.institute_college
          : '',
      youtube:
        this.profile.social_profiles && this.profile.social_profiles.youtube
          ? this.profile.social_profiles.youtube
          : '',
      facebook:
        this.profile.social_profiles && this.profile.social_profiles.facebook
          ? this.profile.social_profiles.facebook
          : '',
      twitter:
        this.profile.social_profiles && this.profile.social_profiles.twitter
          ? this.profile.social_profiles.twitter
          : '',
      instagram:
        this.profile.social_profiles && this.profile.social_profiles.instagram
          ? this.profile.social_profiles.instagram
          : '',
      linked_in:
        this.profile.social_profiles && this.profile.social_profiles.linked_in
          ? this.profile.social_profiles.linked_in
          : '',
      founded_in: this.profile.founded_in
        ? new Date(this.profile.founded_in)
        : '',
      address:
        this.profile.address_fulladdress && this.profile.address_fulladdress
          ? this.profile.address_fulladdress
          : '',
      pincode:
        this.profile.address_pincode && this.profile.address_pincode
          ? this.profile.address_pincode
          : ''
    });
    if (
      this.member_type === 'player' ||
      (this.member_type === 'coach' &&
        this.profile.profile_status.status === 'verified')
    ) {
      this.personalProfileDetailsForm.controls.dob.disable();
    }
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
        name: 'district',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'facebook',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'twitter',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'instagram',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'youtube',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'linked_in',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'bio',
        abstractControl: this._formBuilder.control('', [
          Validators.required,
          Validators.maxLength(350)
        ])
      }
    ];
    this.formControlAdder(this.personalProfileDetailsForm, commonControls);
    if (['academy', 'club'].includes(this.member_type)) {
      let clubAcadCommonControls = [
        {
          name: 'name',
          abstractControl: this._formBuilder.control('', [
            Validators.required,
            Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
          ])
        },

        {
          name: 'short_name',
          abstractControl: this._formBuilder.control('', [Validators.required])
        },
        {
          name: 'founded_in',
          abstractControl: this._formBuilder.control('', [
            Validators.required
            // Validators.minLength(4),
            // Validators.maxLength(4),
            // Validators.max(this.currentYear),
            // Validators.pattern(/^\d+$/)
          ])
        },
        {
          name: 'phone',
          abstractControl: this._formBuilder.control('', [
            Validators.required,
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
          name: 'address',
          abstractControl: this._formBuilder.control('', [Validators.required])
        },
        {
          name: 'pincode',
          abstractControl: this._formBuilder.control('', [Validators.required])
        },
        {
          name: 'stadium_name',
          abstractControl: this._formBuilder.control('', [Validators.required])
        }
      ];
      this.formControlAdder(
        this.personalProfileDetailsForm,
        clubAcadCommonControls
      );
    }
  }
  getLocationStats() {
    this._sharedService
      .getLocationStats()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          console.log('country response is', response.data);
          this.countryArray = response.data;
          console.log('country array is', this.countryArray);
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  getStatesListing(countryID: string) {
    console.log('country id inside getStateListing is///==>', countryID);
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

  onSelectCountry(event: any) {
    if (!event.target.value) {
      this.resetStateDistrict();
    } else {
      console.log('inside onSelectCountry function=>', event.target.value);
      this.getStatesListing(event.target.value);
    }
  }

  resetStateDistrict() {
    this.stateArray = [];
    this.districtArray = [];
    this.personalProfileDetailsForm.controls.state.patchValue('');
    this.personalProfileDetailsForm.controls.district.patchValue('');
  }

  onSelectState(event: any) {
    if (!event.target.value) {
      this.resetDistrict();
    } else {
      this.getDistrictsListing(
        this.personalProfileDetailsForm.controls.country.value,
        event.target.value
      );
    }
  }
  resetDistrict() {
    this.districtArray = [];
    this.personalProfileDetailsForm.controls.district.patchValue('');
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];

      if (!value && !value.length && key != 'bio') {
        continue;
      }
      formData.append(key, value);
    }
    return formData;
  }

  updatePersonalProfileDetails() {
    delete this.personalProfileDetailsForm.value.email;
    const memberType = localStorage.getItem('member_type');

    delete this.personalProfileDetailsForm.value.phone;

    let requestData = this.toFormData(this.personalProfileDetailsForm.value);
    console.log('request data is =>', this.personalProfileDetailsForm.value);
    this.dateModifier(requestData);
    if (this.profile_status === 'verified') requestData.delete('dob');

    this._editProfileService
      .updatePersonalProfileDetails(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          // this.getPersonalProfileDetails();
          this._toastrService.success(
            'Success',
            'Profile updated successfully'
          );

          setTimeout(() => {
            this.getPersonalProfileDetails();
          }, 1000);

          this.toggleMode();
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  dateModifier(requestData: any) {
    this.member_type === 'player' || this.member_type === 'coach'
      ? requestData.set(
          'dob',
          this._dateConversion.convert(
            this.personalProfileDetailsForm.get('dob').value
          )
        )
      : requestData.set(
          'founded_in',
          this._dateConversion.convertToYear(
            this.personalProfileDetailsForm.get('founded_in').value
          )
        );
  }

  openModalForVerifyEmail(
    id: string,
    dataToVerify: string = this.profile.email
  ) {
    console.log('id and email recived are', id, dataToVerify);
    if (this.value == undefined) {
      console.log('inside uuuuuuuuuuuuuuuuuuuuu');
      this.value = dataToVerify;
    }
    this._editProfileService
      .verifyEmailOrMobile(id, dataToVerify)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          console.log('response in api hits');
          console.log(response);
          if (response.data) {
            this._toastrService.success(`Success`, 'Otp Send successfully');
            const dialogRef = this.dialog.open(VerificationComponent, {
              panelClass: 'postpopup',
              data: {
                name: response.data.name,
                email: this.value,
                userId: response.data.user_id,
                mobile_number: this.valueForMobile
              }
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result === 'success') {
                // this.getPostListing();
              }
            });
          }
        },
        error => {
          console.log('inside otpverify ===========>');
          this._toastrService.error(`Error`, 'Otp Not matched');
          // this.error = error;
        }
      );
  }
  openModalForVerifyMobile(
    id: string,
    dataToVerify: string = this.profile.phone
  ) {
    console.log('id and mobile recived are', id, dataToVerify);
    console.log('profile data is=>', this.profile);
    console.log('profile data is=>', this.profile.phone);
    if (this.valueForMobile == undefined) {
      this.valueForMobile = dataToVerify;
    }
    this._editProfileService
      .verifyEmailOrMobile(id, dataToVerify)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          console.log('response in api hits');
          console.log(response);
          if (response.data) {
            this._toastrService.success(`Success`, 'Otp Send successfully');
            const dialogRef = this.dialog.open(VerificationComponent, {
              panelClass: 'postpopup',
              data: {
                name: response.data.name,
                email: this.value,
                userId: response.data.user_id,
                mobile_number: this.valueForMobile
              }
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result === 'success') {
                // this.getPostListing();
              }
            });
          }
        },
        error => {
          console.log('inside otpverify ===========>');
          this._toastrService.error(`Error`, 'Otp Not matched');
          // this.error = error;
        }
      );
  }

  ngOnDestroy() {}
}
