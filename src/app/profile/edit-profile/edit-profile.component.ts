import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { requiredFileDocument } from '@app/shared/validators/requiredFileDocument';
import { requiredFileAvatar } from '@app/shared/validators/requiredFileAvatar';
import { Router } from '@angular/router';
import { HeaderComponent } from '@app/shared/page-components/header/header.component';
import { EditProfileService } from './edit-profile-service';
import { ViewProfileService } from '../view-profile/view-profile.service';
import { SharedService } from '@app/shared/shared.service';
import { untilDestroyed } from '@app/core';
import { Constants } from '@app/shared/static-data/static-data';

interface trophyObject {
  name: string;
  year: string;
  position: string;
}

interface contactPersonObject {
  designation: string;
  name: string;
  email: string;
  phone_number: string;
}

interface topSigningObject {
  name: string;
}
interface topAcademyPlayerObject {
  name: string;
}

interface positionObject {
  id: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @Input() max: Date | null;
  @ViewChild(HeaderComponent, { static: true }) header: HeaderComponent;

  currentYear = new Date().getFullYear();
  tomorrow = new Date();
  environment = environment;
  avatar: File;
  aiff: File;
  document: File;
  aadhar: File;
  employment_contract: File;

  aiff_url: String;
  document_url: String;
  aadhar_url: String;
  employment_contract_url: String;

  profile: any;
  member_type: string = localStorage.getItem('member_type') || 'player';
  player_type: string = 'grassroot';
  user_email = localStorage.getItem('email');
  aboutForm: FormGroup;
  socialProfileForm: FormGroup;
  editProfileForm: FormGroup;

  contact_person: FormArray;
  trophies: FormArray;
  top_signings: FormArray;
  top_players: FormArray;
  position: FormArray;

  positionArray: any[] = [];
  strongFootArray = Constants.STRONG_FOOT;
  countryArray: any[] = [];
  stateArray: any[] = [];
  designationArray = Constants.DESIGNATION_ARRAY;
  leagueArray = Constants.LEAGUE_ARRAY;
  cityArray: any[] = [];
  clubAcadTypeArray = Constants.CLUB_ACAD_TYPE_ARRAY;
  stateAssociationArray = Constants.STATE_ASSOCIATION_ARRAY;

  constructor(
    private _formBuilder: FormBuilder,
    private _viewProfileService: ViewProfileService,
    private _editProfileService: EditProfileService,
    private _sharedService: SharedService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {
    this.createForm();
    this.setCategoryValidators();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnDestroy() {}

  ngOnInit() {
    this.populateView();
    this.initValidations();
    this.getLocationStats();
  }

  initValidations() {
    if (this.editProfileForm.controls.number) {
      this.editProfileForm.controls.document.disable();
      this.editProfileForm.controls.number.disable();
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
    this.getStatesListing(event.target.value);
  }

  onSelectState(event: any) {
    this.getCitiesListing(
      this.editProfileForm.controls.country.value,
      event.target.value
    );
  }

  // selectTab(tabName: string) {
  //   this.player_type = tabName;
  //   this.setCategoryValidators();
  //   this.checkFileValidations();
  // }

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

  populateView() {
    this._viewProfileService
      .getProfileDetails({})
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.profile = response.data;
          if (this.profile.documents.length) {
            if (this.profile.documents[0].type) {
              if (this.editProfileForm.controls.reg_number) {
                this.editProfileForm.controls.aiff.disable();
                this.editProfileForm.controls.reg_number.setValidators(
                  Validators.required
                );
                this.editProfileForm.controls.reg_number.disable();
              }
              if (this.editProfileForm.controls.number) {
                this.editProfileForm.controls.document.disable();
                this.editProfileForm.controls.document_type.disable();
                this.editProfileForm.controls.number.setValidators(
                  Validators.required
                );
                this.editProfileForm.controls.number.disable();
              }
            }
          }
          this.populateFormFields();
          this.populateDocuments();

          if (
            this.profile.member_type === 'club' ||
            this.profile.member_type === 'academy'
          ) {
            this.populateDynamicContact();
            this.populateDynamicTrophy();
            this.populateDynamicTopSigning();
            this.populateDynamicTopAcademyPlayer();
          }

          if (this.profile.member_type === 'player') {
            this.getPositionList();
            this.populateDynamicPosition();
          }

          if (this.profile.avatar_url) {
            this.profile.avatar_url =
              this.environment.mediaUrl + this.profile.avatar_url;
          } else {
            this.profile.avatar_url =
              this.environment.mediaUrl + '/uploads/avatar/user-avatar.png';
          }

          this._toastrService.success(
            'Successful',
            'Data retrieved successfully'
          );

          this.setCategoryValidators();
          this.checkFileValidations();
        },
        error => {
          this._toastrService.error(
            `${error.error.message}`,
            'Failed to load data'
          );
        }
      );
  }
  getPositionList() {
    this._editProfileService
      .getPositionList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.positionArray = response.data.records;
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  setCategoryValidators() {
    if (this.member_type === 'player') {
      const employmentContract = this.editProfileForm.get(
        'employment_contract'
      );
      const aadhar = this.editProfileForm.get('aadhar');
      const height_feet = this.editProfileForm.get('height_feet');
      const height_inches = this.editProfileForm.get('height_inches');
      const head_coach_phone = this.editProfileForm.get('head_coach_phone');
      const head_coach_email = this.editProfileForm.get('head_coach_email');
      const head_coach_name = this.editProfileForm.get('head_coach_name');

      this.editProfileForm
        .get('associated_club')
        .valueChanges.subscribe(associated_club => {
          if (associated_club === 'yes') {
            head_coach_phone.setValidators([
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern(/^\d+$/)
            ]);
            head_coach_email.setValidators([Validators.email]);
            head_coach_name.setValidators([
              Validators.required,
              Validators.pattern(/^[a-zA-Z0-9\&\-\(\) ]+$/)
            ]);
          } else if (associated_club === 'no') {
            head_coach_phone.setValue(''); // setValue use to clear any input provided
            head_coach_email.setValue('');
            head_coach_name.setValue('');
            head_coach_phone.setValidators([
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern(/^\d+$/)
            ]);
            head_coach_email.setValidators([Validators.email]);
            head_coach_name.setValidators([
              Validators.pattern(/^[a-zA-Z0-9\&\-\(\) ]+$/)
            ]);
          }
          head_coach_phone.updateValueAndValidity();
          head_coach_email.updateValueAndValidity();
          head_coach_name.updateValueAndValidity();
        });

      this.editProfileForm
        .get('player_type')
        .valueChanges.subscribe(player_type => {
          // if(!this.profile.documents && this.profile.documents[0])
          aadhar.setValidators([Validators.required, requiredFileDocument]);

          if (player_type === 'professional') {
            employmentContract.setValidators([
              Validators.required,
              requiredFileDocument
            ]);
          }
          if (player_type === 'amateur' || player_type === 'grassroot') {
            employmentContract.setValidators(null);
          }

          if (player_type === 'amateur' || player_type === 'professional') {
            height_feet.setValidators([
              Validators.required,
              Validators.min(1),
              Validators.max(10),
              Validators.pattern(/^\d+$/)
            ]);
            height_inches.setValidators([
              Validators.required,
              Validators.min(0),
              Validators.max(12),
              Validators.pattern(/^\d+$/)
            ]);
          }

          if (player_type === 'grassroot') {
            height_feet.setValidators([
              Validators.min(1),
              Validators.max(10),
              Validators.pattern(/^\d+$/)
            ]);
            height_inches.setValidators([
              Validators.min(0),
              Validators.max(12),
              Validators.pattern(/^\d+$/)
            ]);
          }

          height_feet.updateValueAndValidity();
          height_inches.updateValueAndValidity();
          aadhar.updateValueAndValidity();
          employmentContract.updateValueAndValidity();

          this.checkFileValidations();
        });
    } else if (this.member_type === 'club' || this.member_type === 'academy') {
      const address = this.editProfileForm.get('address');
      const pincode = this.editProfileForm.get('pincode');
      const trophies = this.editProfileForm.get('trophies');
      const leagueOther = this.editProfileForm.get('league_other');
      const associationOther = this.editProfileForm.get('association_other');
      const documentNumber = this.editProfileForm.get('number');

      if (this.member_type === 'club') {
        trophies.setValidators(null);
        address.setValidators(null);
        pincode.setValidators([Validators.pattern(/^\d+$/)]);
      }

      if (this.member_type === 'academy') {
        trophies.setValidators([Validators.required]);
        address.setValidators([Validators.required]);
        pincode.setValidators([
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]);

        this.editProfileForm
          .get('document_type')
          .valueChanges.subscribe(type => {
            if (type === 'aiff') {
              // later it will be fully implemented
              documentNumber.setValidators([Validators.required]);
            } else if (type === 'pan') {
              documentNumber.setValidators([
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
                Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]/)
              ]);
            } else if (type === 'coi') {
              documentNumber.setValidators([
                Validators.required,
                Validators.pattern(/^[a-z-A-Z0-9]+$/)
              ]);
            } else if (type === 'tin') {
              documentNumber.setValidators([
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(12),
                Validators.pattern(/^\d+$/)
              ]);
            }
            documentNumber.updateValueAndValidity();
          });
      }

      this.editProfileForm
        .get('association')
        .valueChanges.subscribe(association => {
          if (association !== 'Others') {
            associationOther.setValue('');
          }
        });
      this.editProfileForm.get('league').valueChanges.subscribe(league => {
        if (league !== 'Other') {
          leagueOther.setValue('');
        }
      });

      associationOther.updateValueAndValidity();
      leagueOther.updateValueAndValidity();
      trophies.updateValueAndValidity();
      address.updateValueAndValidity();
      pincode.updateValueAndValidity();
    }
  }

  setRequestDataObject(requestData: any, name: string) {
    requestData.set(name, JSON.stringify(this.editProfileForm.get(name).value));
  }

  editProfile() {
    let requestData = this.toFormData(this.editProfileForm.value);

    if (this.member_type === 'player') {
      if (this.aadhar) requestData.set('aadhar', this.aadhar);
      if (this.player_type === 'professional') {
        if (this.employment_contract)
          requestData.set('employment_contract', this.employment_contract);
      }
      this.setRequestDataObject(requestData, 'position');

      requestData.set('dob', this.editProfileForm.get('dob').value);
    } else if (this.member_type === 'club' || this.member_type === 'academy') {
      if (this.member_type === 'club') requestData.set('aiff', this.aiff);
      else requestData.set('document', this.document);

      this.setRequestDataObject(requestData, 'contact_person');
      this.setRequestDataObject(requestData, 'trophies');

      if (this.member_type === 'club')
        this.setRequestDataObject(requestData, 'top_signings');

      if (this.member_type === 'academy')
        this.setRequestDataObject(requestData, 'top_players');
    }

    this._editProfileService
      .editProfile(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          this._toastrService.success(
            'Successful',
            'Profile updated successfully'
          );
          this._router.navigate(['/member/profile/view']);
        },
        err => {
          this._toastrService.error('Error', err.error.message);
        }
      );
  }

  uploadAadhar(files: FileList) {
    this.aadhar = files[0];
  }

  uploadAiff(files: FileList) {
    this.aiff = files[0];
  }

  uploadDocument(files: FileList) {
    this.document = files[0];
  }

  uploadAvatar(files: FileList) {
    this.avatar = files[0];
    const requestData = new FormData();
    requestData.set('avatar', this.avatar);

    if (this.aboutForm.valid) {
      this._editProfileService
        .updateBio(requestData)
        .pipe(untilDestroyed(this))
        .subscribe(
          res => {
            if (res.data.avatar_url) {
              this.profile.avatar_url =
                this.environment.mediaUrl + res.data.avatar_url;
            }
            localStorage.setItem(
              'avatar_url',
              this.environment.mediaUrl + res.data.avatar_url
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
  }

  uploadEmploymentContract(files: FileList) {
    this.employment_contract = files[0];
  }

  removeAvatar() {
    this._editProfileService
      .removeAvatar()
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          if (res.data.avatar_url) {
            this.profile.avatar_url =
              this.environment.mediaUrl + res.data.avatar_url;
          }
          localStorage.setItem(
            'avatar_url',
            this.environment.mediaUrl + res.data.avatar_url
          );
          this.header.avatar_url = localStorage.getItem('avatar_url');
          this._toastrService.success(
            'Successful',
            'Avatar removed successfully'
          );
        },
        err => {
          this._toastrService.error('Error', err.error.message);
        }
      );
  }

  socialProfile() {
    this._editProfileService
      .updateBio(this.socialProfileForm.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          this._toastrService.success(
            'Successful',
            'Social profiles updated successfully'
          );
        },
        err => {
          this._toastrService.error('Error', err.error.message);
        }
      );
  }
  about() {
    let requestData = this.toFormData(this.aboutForm.value);
    if (this.avatar) requestData.set('avatar', this.avatar);

    this._editProfileService
      .updateBio(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          this._toastrService.success('Successful', 'Bio updated successfully');
        },
        err => {
          this._toastrService.error('Error', err.error.message);
        }
      );
  }

  createForm() {
    this.aboutForm = this._formBuilder.group({
      avatar: ['', [requiredFileAvatar]],
      bio: ['', [Validators.maxLength(1000)]]
    });

    this.socialProfileForm = this._formBuilder.group({
      instagram: [''],
      facebook: [''],
      twitter: [''],
      youtube: ['']
    });

    if (this.member_type === 'player') {
      this.editProfileForm = this._formBuilder.group({
        // personal_details
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
        country: ['', [Validators.required]], // country or nationality
        state: ['', [Validators.required]],
        city: ['', [Validators.required]], //city
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ]
        ],
        school: ['', []], //institute.school
        university: [''], //institute.univeristy
        college: [''], //institute.college
        aadhar: ['', []],
        employment_contract: ['', []],
        // // professional_details
        position: this._formBuilder.array([]),
        strong_foot: ['', []],
        associated_club: ['', []],
        weak_foot: ['', []],
        head_coach_name: [''],
        head_coach_phone: [
          '',
          [
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ]
        ],
        head_coach_email: [''],
        former_club: ['', []]
      });
    } else if (this.member_type === 'club') {
      this.editProfileForm = this._formBuilder.group({
        // personal_details
        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
          ]
        ],
        short_name: ['', []],
        founded_in: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.max(this.currentYear),
            Validators.pattern(/^\d+$/)
          ]
        ],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', []],
        pincode: ['', []],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ]
        ],
        stadium_name: ['', []],
        league: ['', [Validators.required]],
        league_other: ['', [Validators.pattern(/^[a-zA-Z0-9\&\-\(\)\' ]+$/)]],
        association: ['', [Validators.required]],
        association_other: [],
        contact_person: this._formBuilder.array([], [Validators.required]),
        trophies: this._formBuilder.array([]),
        top_signings: this._formBuilder.array([], []),
        reg_number: ['', Validators.required],
        associated_players: [
          '',
          [Validators.required, Validators.pattern(/^\d+$/)]
        ],
        aiff: ['', [Validators.required, requiredFileDocument]],
        type: ['', [Validators.required]]
        // onclick upload document [aiff]
      });
    } else if (this.member_type === 'academy') {
      this.editProfileForm = this._formBuilder.group({
        // personal_details
        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
          ]
        ],
        short_name: ['', []],
        founded_in: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            Validators.max(this.currentYear),
            Validators.pattern(/^\d+$/)
          ]
        ],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ]
        ],
        stadium_name: ['', []],
        league: ['', [Validators.required]],
        league_other: ['', [Validators.pattern(/^[a-zA-Z0-9\&\-\(\)\' ]+$/)]],
        association: ['', [Validators.required]],
        association_other: [],
        document_type: ['', []],
        number: [''],
        contact_person: this._formBuilder.array([], [Validators.required]),
        trophies: this._formBuilder.array([], []),
        top_players: this._formBuilder.array([], []),
        associated_players: [
          '',
          [Validators.required, Validators.pattern(/^\d+$/)]
        ],
        document: ['', [requiredFileDocument]],
        type: ['', [Validators.required]]
        //onclick upload documenet aiff / pan card/tin / coi
      });
    }
  }

  checkFileValidations() {
    if (this.profile.documents) {
      this.profile.documents.forEach((data: any) => {
        if (data.type === 'aadhar' || data.type === 'employment_contract') {
          this.removeFileValidations(data.type);
        }
      });
    }
  }

  removeFileValidations(type: string) {
    const fileValidation = this.editProfileForm.get(type);
    fileValidation.setValidators(null);
    fileValidation.updateValueAndValidity();
  }

  populateFormFields() {
    this.editProfileForm.valueChanges.subscribe(val => {
      this.player_type = val.player_type;
    });

    if (this.profile.member_type === 'player') {
      if (
        this.profile.club_academy_details &&
        this.profile.club_academy_details.head_coach_phone &&
        this.profile.club_academy_details.head_coach_name
      )
        this.editProfileForm.get('associated_club').setValue('yes');
      else this.editProfileForm.get('associated_club').setValue('no');
    }

    if (this.profile.country) {
      this.getStatesListing(this.profile.country.id);
      this.editProfileForm.patchValue({
        state: this.profile.state ? this.profile.state.id : ''
      });

      this.getCitiesListing(this.profile.country.id, this.profile.state.id);
      this.editProfileForm.patchValue({
        city: this.profile.city ? this.profile.city.id : ''
      });
    }

    this.editProfileForm.patchValue({
      player_type: this.profile.player_type ? this.profile.player_type : '',
      name: this.profile.name,
      short_name: this.profile.short_name ? this.profile.short_name : '',
      founded_in: this.profile.founded_in,
      address:
        this.profile.address && this.profile.address.full_address
          ? this.profile.address.full_address
          : '',
      pincode:
        this.profile.address && this.profile.address.pincode
          ? this.profile.address.pincode
          : '',
      first_name: this.profile.first_name ? this.profile.first_name : '',
      last_name: this.profile.last_name ? this.profile.last_name : '',
      height_feet:
        this.profile.height && this.profile.height.feet
          ? this.profile.height.feet
          : '',
      height_inches:
        this.profile.height && this.profile.height.inches
          ? this.profile.height.inches
          : '',
      weight: this.profile.weight ? this.profile.weight : '',
      dob: this.profile.dob ? new Date(this.profile.dob) : '',
      phone: this.profile.phone ? this.profile.phone : '',
      country: this.profile.country ? this.profile.country.id : '',
      stadium_name: this.profile.stadium_name ? this.profile.stadium_name : '',
      league: this.profile.league ? this.profile.league : '',
      type: this.profile.type ? this.profile.type : '',
      league_other: this.profile.league_other ? this.profile.league_other : '',
      association: this.profile.association ? this.profile.association : '',
      association_other: this.profile.association_other
        ? this.profile.association_other
        : '',
      strong_foot: this.profile.strong_foot ? this.profile.strong_foot : '',
      weak_foot: this.profile.weak_foot ? this.profile.weak_foot : '',
      head_coach_name: this.profile.club_academy_details
        ? this.profile.club_academy_details.head_coach_name
        : '',
      head_coach_phone: this.profile.club_academy_details
        ? this.profile.club_academy_details.head_coach_phone
        : '',
      head_coach_email: this.profile.club_academy_details
        ? this.profile.club_academy_details.head_coach_email
        : '',
      contact_person: this.profile.contact_person,
      trophies: this.profile.trophies,
      associated_players: this.profile.associated_players,
      former_club: this.profile.former_club ? this.profile.former_club : '',
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
      document_type:
        this.profile.documents && this.profile.documents[0]
          ? this.profile.documents[0].type
          : '',
      number: this.profile.documents.length
        ? this.profile.documents[0].document_number
        : '',
      reg_number: this.profile.documents.length
        ? this.profile.documents[0].document_number
        : ''
    });

    if (this.profile.social_profiles) {
      this.socialProfileForm.patchValue({
        instagram: this.profile.social_profiles.instagram,
        facebook: this.profile.social_profiles.facebook,
        twitter: this.profile.social_profiles.twitter,
        youtube: this.profile.social_profiles.youtube
      });
    }

    if (this.profile.bio) {
      this.aboutForm.patchValue({
        bio: this.profile.bio
      });
    }
  }

  populateDocuments() {
    if (this.profile.documents.length !== 0) {
      this.profile.documents.forEach((element: any) => {
        let fileLink = this.environment.mediaUrl + element.link;
        if (element.type === 'aadhar') {
          this.aadhar_url = fileLink;
        }
        if (element.type === 'employment_contract') {
          this.employment_contract_url = fileLink;
        }
        if (element.type === 'aiff') {
          this.aiff_url = fileLink;
        }
        if (
          element.type !== 'employment_contract' &&
          element.type !== 'aadhar' &&
          element.type !== 'aiff'
        ) {
          this.document_url = fileLink;
        }
      });
    }
  }

  populateDynamicContact() {
    if (this.profile.contact_person.length !== 0) {
      for (let i = 0; i < this.profile.contact_person.length; i++) {
        this.addContactPerson(this.profile.contact_person[i]);
      }
    }
  }

  populateDynamicTrophy() {
    if (this.profile.trophies.length !== 0) {
      for (let i = 0; i < this.profile.trophies.length; i++) {
        this.addTrophy(this.profile.trophies[i]);
      }
    }
  }

  populateDynamicTopSigning() {
    if (this.profile.top_signings.length !== 0) {
      for (let i = 0; i < this.profile.top_signings.length; i++) {
        this.addTopSigning(this.profile.top_signings[i]);
      }
    }
  }
  populateDynamicTopAcademyPlayer() {
    if (this.profile.top_players.length !== 0) {
      for (let i = 0; i < this.profile.top_players.length; i++) {
        this.addTopAcademyPlayer(this.profile.top_players[i]);
      }
    }
  }

  populateDynamicPosition() {
    for (let i = 0; i < 3; i++) {
      this.preparePosition(this.profile.position[i], i);
    }
  }

  addContactPerson(data?: contactPersonObject) {
    this.contact_person = this.editProfileForm.get(
      'contact_person'
    ) as FormArray;

    if (data !== undefined) {
      this.contact_person.push(
        this._formBuilder.group({
          designation: [data.designation, [Validators.required]],
          name: [data.name, [Validators.required]],
          email: [data.email, [Validators.required, Validators.email]],
          phone_number: [
            data.phone_number,
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern(/^\d+$/)
            ]
          ]
        })
      );
    } else {
      this.contact_person.push(
        this._formBuilder.group({
          designation: ['', [Validators.required]],
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          phone_number: [
            '',
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern(/^\d+$/)
            ]
          ]
        })
      );
    }
  }

  removeContactPerson(i: number) {
    this.contact_person.removeAt(i);
  }

  addTrophy(data?: trophyObject) {
    this.trophies = this.editProfileForm.get('trophies') as FormArray;

    if (data !== undefined) {
      this.trophies.push(
        this._formBuilder.group({
          name: [data.name, [Validators.required]],
          year: [
            data.year,
            [
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(4),
              Validators.max(this.currentYear),
              Validators.pattern(/^\d+$/)
            ]
          ],
          position: [data.position, [Validators.required]]
        })
      );
    } else {
      this.trophies.push(
        this._formBuilder.group({
          name: ['', [Validators.required]],
          year: [
            '',
            [
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(4),
              Validators.max(this.currentYear),
              Validators.pattern(/^\d+$/)
            ]
          ],
          position: ['', [Validators.required]]
        })
      );
    }
  }

  removeTrophy(i: number) {
    this.trophies.removeAt(i);
  }

  addTopSigning(data?: topSigningObject) {
    this.top_signings = this.editProfileForm.get('top_signings') as FormArray;

    if (data !== undefined) {
      this.top_signings.push(
        this._formBuilder.group({
          name: [data.name, []]
        })
      );
    } else {
      this.top_signings.push(
        this._formBuilder.group({
          name: ['', []]
        })
      );
    }
  }

  removeTopSigning(i: number) {
    this.top_signings.removeAt(i);
  }

  addTopAcademyPlayer(data?: topAcademyPlayerObject) {
    this.top_players = this.editProfileForm.get('top_players') as FormArray;

    if (data !== undefined) {
      this.top_players.push(
        this._formBuilder.group({
          name: [data.name, []]
        })
      );
    } else {
      this.top_players.push(
        this._formBuilder.group({
          name: ['', []]
        })
      );
    }
  }

  removeTopAcademyPlayer(i: number) {
    this.top_players.removeAt(i);
  }

  preparePosition(data?: positionObject, index?: number) {
    this.position = this.editProfileForm.get('position') as FormArray;

    if (data !== undefined) {
      this.position.push(
        this._formBuilder.group({
          priority: index + 1,
          id: [data.id, []]
        })
      );
    } else {
      this.position.push(
        this._formBuilder.group({
          priority: index + 1,
          id: ['', []]
        })
      );
    }
  }

  onChangeDocumentType(event: any) {
    this.editProfileForm.controls.number.enable();
    this.editProfileForm.controls.document.enable();
    // this.editProfileForm.controls.number.setValidators(Validators.required);
    this.editProfileForm.controls.document.setValidators([
      Validators.required,
      requiredFileDocument
    ]);
    this.editProfileForm.controls.number.patchValue('');
    this.editProfileForm.controls.document.patchValue('');
  }
}
