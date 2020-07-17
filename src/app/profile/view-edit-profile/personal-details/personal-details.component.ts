import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEditProfileService } from '../view-edit-profile.service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { SharedService } from '@app/shared/shared.service';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators
} from '@angular/forms';
import { environment } from '@env/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeaderComponent } from '@app/shared/page-components/header/header.component';

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
  editMode: boolean = false;
  player_type: string = 'grassroot';
  @ViewChild(HeaderComponent, { static: true }) header: HeaderComponent;
  constructor(
    private _editProfileService: ViewEditProfileService,
    private _sharedService: SharedService,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer
  ) {
    this.createForm();
    this.manageCommonControls();
    // this.setCategoryValidators();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
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
    this.editMode = !this.editMode;
  }
  createForm() {
    if (this.member_type === 'player') {
      this.personalProfileDetailsForm = this._formBuilder.group({
        bio: ['', [Validators.maxLength(350)]],
        email: [
          { value: '', disabled: true },
          [Validators.required, Validators.email]
        ],
        facebook: [''],
        twitter: [''],
        instagram: [''],
        youtube: [''],
        linked_in: [''],
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
        player_type: ['', [Validators.required]],
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
        dob: ['', [Validators.required]], //2020-04-14T18:30:00.000Z"
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
            Validators.min(1),
            Validators.max(200),
            Validators.pattern(/^\d+(\.\d)?$/)
          ]
        ],
        school: ['', []],
        university: [''],
        college: ['']
      });
    }
  }
  ngOnInit() {
    this.getLocationStats();
    this.getPersonalProfileDetails();
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
          this.header.avatar_url = localStorage.getItem('avatar_url');
          this._toastrService.success(
            'Successful',
            'Avatar updated successfully'
          );
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
          //   'Successful',
          //   'Data retrieved successfully'
          // );
          this.profile = response.data;
          this.profile_status = this.profile.profile_status.status;
          this.player_type = this.profile.player_type;
          if (this.profile.avatar_url) {
            this.profile.avatar_url =
              environment.mediaUrl + this.profile.avatar_url;
          } else {
            this.profile.avatar_url =
              environment.mediaUrl + '/uploads/avatar/user-avatar.png';
          }
          this.populateFormFields(this.profile);
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }
  populateFormFields(profileData: any) {
    this.personalProfileDetailsForm.patchValue(profileData);
    if (this.profile.country) {
      this.getStatesListing(this.profile.country.id);
      this.getCitiesListing(this.profile.country.id, this.profile.state.id);
    }
    this.personalProfileDetailsForm.patchValue({
      country: this.profile.country ? this.profile.country.id : ''
    });
    this.personalProfileDetailsForm.patchValue({
      state: this.profile.state ? this.profile.state.id : '',
      city: this.profile.city ? this.profile.city.id : '',
      height_feet:
        this.profile.height && this.profile.height.feet
          ? this.profile.height.feet
          : '',
      height_inches:
        this.profile.height && this.profile.height.inches
          ? this.profile.height.inches
          : '',
      school:
        this.profile.institute && this.profile.institute.school
          ? this.profile.institute.school
          : '',
      university:
        this.profile.institute && this.profile.institute.university
          ? this.profile.institute.university
          : '',
      college:
        this.profile.institute && this.profile.institute.college
          ? this.profile.institute.college
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
          : ''
    });
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
    let body: any = this.personalProfileDetailsForm.value;
    if (this.profile_status === 'verified') delete body.dob;
    this._editProfileService
      .updatePersonalProfileDetails(body)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success(
            'Successful',
            'Profile updated successfully'
          );
          this.getPersonalProfileDetails();
          this.toggleMode();
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  ngOnDestroy() {}
}
