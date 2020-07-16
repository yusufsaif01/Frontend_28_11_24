import { Component, OnInit } from '@angular/core';
import { ViewEditProfileService } from '../view-edit-profile.service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { SharedService } from '@app/shared/shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
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
  }
  createForm() {
    this.personalProfileDetailsForm = this._formBuilder.group({
      player_type: [],
      bio: [],
      facebook: [],
      twitter: [],
      instagram: [],
      youtube: [],
      linked_in: [],
      first_name: [],
      last_name: [],
      dob: [],
      player_height_feet: [],
      player_height_inches: [],
      weight: [],
      country: [],
      state: [],
      city: [],
      school: [],
      college: [],
      university: [],
      phone: []
      // mobile_number: [],
      // pincode: [],
      // address: [],
      // stadium_name: [],
      // name: [],
      // short_name: [],
      // founded_in: []
    });
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
