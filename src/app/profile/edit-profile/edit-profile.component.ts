import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { ContractListTableConfig } from './contract-listing-table-conf';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { requiredFileDocument } from '@app/shared/validators/requiredFileDocument';
import { requiredFileAvatar } from '@app/shared/validators/requiredFileAvatar';
import { requiredPdfDocument } from '@app/shared/validators/requiredPdfDocument';
import { Router } from '@angular/router';
import { HeaderComponent } from '@app/shared/page-components/header/header.component';
import { EditProfileService } from './edit-profile.service';
import { ViewProfileService } from '../view-profile/view-profile.service';
import { SharedService } from '@app/shared/shared.service';
import { untilDestroyed } from '@app/core';
import { Constants } from '@app/shared/static-data/static-data';
import { MatTableDataSource } from '@angular/material/table';

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
  public tableConfig: ContractListTableConfig = new ContractListTableConfig();
  public dataSource = new MatTableDataSource([]);

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
  aadhar_front: File;
  aadhar_back: File;
  player_photo: File;
  profile_status: string;

  aiff_url: String;
  document_url: String;
  aadhar_url: String;
  aadhar_front_url: string;
  aadhar_back_url: string;
  employment_contract_url: String;
  player_photo_url: String;

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
    this.manageCommonControls();
    this.setCategoryValidators();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnDestroy() {}

  ngOnInit() {
    this.populateView();
    this.initValidations();
    this.getLocationStats();
  }

  setControlState() {
    let controls = [
      'aadhar',
      'aadhar_front',
      'aadhar_back',
      'aadhar_number',
      'aadhar_media_type',
      'player_photo',
      'employment_contract',
      'dob',
      'aiff_id',
      'aiff',
      'document_type',
      'document',
      'number'
    ];
    if (this.profile_status === 'verified') {
      controls.forEach(control => {
        if (this.editProfileForm.get(control)) {
          this.editProfileForm.get(control).disable();
        }
      });
    }
  }

  initValidations() {
    if (this.editProfileForm.controls.number) {
      this.editProfileForm.controls.document.disable();
      this.editProfileForm.controls.number.disable();
    }
  }

  getEmploymentContractList() {
    this._editProfileService
      .getEmploymentContractList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          this.dataSource = new MatTableDataSource(records);
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
    this.editProfileForm.controls.state.patchValue('');
    this.editProfileForm.controls.city.patchValue('');
  }

  onSelectState(event: any) {
    if (!event.target.value) {
      this.resetCity();
    } else {
      this.getCitiesListing(
        this.editProfileForm.controls.country.value,
        event.target.value
      );
    }
  }
  resetCity() {
    this.cityArray = [];
    this.editProfileForm.controls.city.patchValue('');
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
          this.profile_status = this.profile.profile_status.status;
          // if (this.profile.documents && this.profile.documents.length) {
          //   if (this.profile.documents[0].type) {
          //     if (this.editProfileForm.controls.reg_number) {
          //       this.editProfileForm.controls.aiff.disable();
          //       this.editProfileForm.controls.reg_number.setValidators(
          //         Validators.required
          //       );
          //       this.editProfileForm.controls.reg_number.disable();
          //     }
          //     if (this.editProfileForm.controls.number) {
          //       this.editProfileForm.controls.document.disable();
          //       this.editProfileForm.controls.document_type.disable();
          //       this.editProfileForm.controls.number.setValidators(
          //         Validators.required
          //       );
          //       this.editProfileForm.controls.number.disable();
          //     }
          //   }
          // }
          this.populateFormFields();
          this.populateDocuments();
          this.setControlState();

          if (
            this.profile.member_type === 'club' ||
            this.profile.member_type === 'academy'
          ) {
            let controlFuncObject = {
              contact_person: [
                this.profile.contact_person,
                this.addContactPerson
              ],
              trophies: [this.profile.trophies, this.addTrophy],
              top_signings: [this.profile.top_signings, this.addTopSigning],
              top_players: [this.profile.top_players, this.addTopAcademyPlayer]
            };
            for (const key in controlFuncObject) {
              this.populateDynamicControl(
                controlFuncObject[key][0],
                controlFuncObject[key][1]
              );
            }
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

  setPlayerValidators() {
    const employmentContract = this.editProfileForm.get('employment_contract');
    const head_coach_phone = this.editProfileForm.get('head_coach_phone');
    const head_coach_email = this.editProfileForm.get('head_coach_email');
    const head_coach_name = this.editProfileForm.get('head_coach_name');
    const aadhar_front = this.editProfileForm.get('aadhar_front');
    const aadhar_back = this.editProfileForm.get('aadhar_back');
    const aadhar = this.editProfileForm.get('aadhar');
    const aadhar_media_type = this.editProfileForm.get('aadhar_media_type');

    let aadharImageControl = {
      aadhar_front: [Validators.required, requiredFileAvatar],
      aadhar_back: [Validators.required, requiredFileAvatar]
    };
    let aadharPdfControl = {
      aadhar: [Validators.required, requiredPdfDocument]
    };
    this.editProfileForm
      .get('aadhar_media_type')
      .valueChanges.subscribe(value => {
        if (value == 'image') {
          aadhar_front.setValue('');
          aadhar_back.setValue('');
          this.setControlValidation(this.editProfileForm, aadharImageControl);

          aadhar.setValidators(null);
        } else if (value == 'pdf') {
          aadhar.setValue('');
          this.setControlValidation(this.editProfileForm, aadharPdfControl);
          aadhar_front.setValidators(null);
          aadhar_back.setValidators(null);
        }
        aadhar_front.updateValueAndValidity();
        aadhar_back.updateValueAndValidity();
        aadhar.updateValueAndValidity();
      });

    let headCoachControl = {
      head_coach_phone: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/)
      ],
      head_coach_email: [Validators.email],
      head_coach_name: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\&\-\(\) ]+$/)
      ]
    };

    this.editProfileForm
      .get('associated_club')
      .valueChanges.subscribe(associated_club => {
        if (associated_club === 'yes') {
          this.checkRequiredValidator(
            headCoachControl,
            headCoachControl.head_coach_phone,
            1
          );
          this.checkRequiredValidator(
            headCoachControl,
            headCoachControl.head_coach_name,
            1
          );

          this.setControlValidation(this.editProfileForm, headCoachControl);
        } else if (associated_club === 'no') {
          head_coach_phone.setValue(''); // setValue use to clear any input provided
          head_coach_email.setValue('');
          head_coach_name.setValue('');
          this.checkRequiredValidator(
            headCoachControl,
            headCoachControl.head_coach_phone,
            2
          );
          this.checkRequiredValidator(
            headCoachControl,
            headCoachControl.head_coach_name,
            2
          );

          this.setControlValidation(this.editProfileForm, headCoachControl);
        }
      });

    let employmentContractControl = {
      employment_contract: [Validators.required, requiredFileDocument]
    };

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
    if (aadhar_media_type.value == 'pdf') {
      this.setControlValidation(this.editProfileForm, aadharPdfControl);
    } else if (aadhar_media_type.value == 'image') {
      this.setControlValidation(this.editProfileForm, aadharImageControl);
    }

    this.editProfileForm
      .get('player_type')
      .valueChanges.subscribe(player_type => {
        // if(!this.profile.documents && this.profile.documents[0])
        // aadhar.setValidators([Validators.required, requiredFileDocument]);

        if (player_type === 'professional') {
          // employmentContract.setValidators([
          //   Validators.required,
          //   requiredFileDocument
          // ]);
          this.setControlValidation(
            this.editProfileForm,
            employmentContractControl
          );
        }
        if (player_type === 'amateur' || player_type === 'grassroot') {
          employmentContract.setValidators(null);
        }

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

          this.setControlValidation(this.editProfileForm, heightControl);
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

          this.setControlValidation(this.editProfileForm, heightControl);
        }

        // aadhar.updateValueAndValidity();
        employmentContract.updateValueAndValidity();

        this.checkFileValidations();
      });
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

  setCategoryValidators() {
    const associationOther = this.editProfileForm.get('association_other');
    this.editProfileForm
      .get('association')
      .valueChanges.subscribe(association => {
        if (association !== 'Others') {
          associationOther.setValue('');
        }
      });
    if (this.member_type === 'player') {
      this.setPlayerValidators();
    } else if (this.member_type === 'club' || this.member_type === 'academy') {
      const address = this.editProfileForm.get('address');
      const pincode = this.editProfileForm.get('pincode');
      const trophies = this.editProfileForm.get('trophies');
      const leagueOther = this.editProfileForm.get('league_other');
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
    let aadhar_media_type = this.editProfileForm.get('aadhar_media_type');
    let requestData = this.toFormData(this.editProfileForm.value);

    if (this.member_type === 'player') {
      if (aadhar_media_type.value === 'pdf' && this.aadhar) {
        requestData.set('aadhar', this.aadhar);
        requestData.delete('aadhar_front');
        requestData.delete('aadhar_back');
      } else if (
        aadhar_media_type.value === 'image' &&
        this.aadhar_front &&
        this.aadhar_back
      ) {
        requestData.delete('aadhar');
        requestData.set('aadhar_front', this.aadhar_front);
        requestData.set('aadhar_back', this.aadhar_back);
      } else {
        requestData.delete('aadhar_media_type');
      }

      if (this.player_photo) requestData.set('player_photo', this.player_photo);

      if (this.player_type === 'professional') {
        if (this.employment_contract)
          requestData.set('employment_contract', this.employment_contract);
      }
      this.setRequestDataObject(requestData, 'position');

      if (this.profile_status === 'verified') requestData.delete('dob');
      else requestData.set('dob', this.editProfileForm.get('dob').value);
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

  uploadPlayerPhoto(files: FileList) {
    this.player_photo = files[0];
  }

  uploadAadhar(files: FileList, type?: string) {
    if (type == 'single') this.aadhar = files[0];
    if (type == 'front') this.aadhar_front = files[0];
    if (type == 'back') this.aadhar_back = files[0];
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
        name: 'association',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'association_other',
        abstractControl: this._formBuilder.control('')
      }
    ];
    this.formControlAdder(this.editProfileForm, commonControls);
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
          name: 'league',
          abstractControl: this._formBuilder.control('', [Validators.required])
        },

        {
          name: 'league_other',
          abstractControl: this._formBuilder.control('', [
            Validators.pattern(/^[a-zA-Z0-9\&\-\(\)\' ]+$/)
          ])
        },
        {
          name: 'contact_person',
          abstractControl: this._formBuilder.array([], [Validators.required])
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
        },
        {
          name: 'trophies',
          abstractControl: this._formBuilder.array([])
        }
      ];
      this.formControlAdder(this.editProfileForm, clubAcadCommonControls);
    }
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
        college: [''],
        aadhar: [''], //pdf
        aadhar_number: [
          '',
          [
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(12),
            Validators.pattern(/^\d+$/)
          ]
        ], //number
        aadhar_media_type: ['', [Validators.required]], //string
        aadhar_front: ['', []], //img
        aadhar_back: ['', []], //img
        player_photo: ['', [Validators.required, requiredFileAvatar]], //img
        employment_contract: ['', []],
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
        top_signings: this._formBuilder.array([], []),
        aiff_id: ['', Validators.required],
        aiff: ['', [Validators.required, requiredFileDocument]]
      });
    } else if (this.member_type === 'academy') {
      this.editProfileForm = this._formBuilder.group({
        document_type: ['', []],
        number: [''],
        top_players: this._formBuilder.array([], []),
        document: ['', [requiredFileDocument]]
      });
    }
  }

  checkFileValidations() {
    if (this.profile.documents) {
      this.profile.documents.forEach((data: any) => {
        if (data.type === 'employment_contract') {
          this.removeFileValidations(data.type);
        }
        if (data.type === 'aiff' && this.member_type == 'club') {
          this.removeFileValidations(data.type);
        }
        if (data.type === 'aadhar') {
          this.removeFileValidations('player_photo');
          if (data.media.attachment_type === 'pdf')
            this.removeFileValidations('aadhar');
          if (data.media.attachment_type === 'image') {
            this.removeFileValidations('aadhar_front');
            this.removeFileValidations('aadhar_back');
          }
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
      mobile_number: this.profile.mobile_number
        ? this.profile.mobile_number
        : '',
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
      number:
        this.profile.documents && this.profile.documents.length
          ? this.profile.documents[0].document_number
          : '',
      aiff_id:
        this.profile.documents && this.profile.documents.length
          ? this.profile.documents[0].document_number
          : '',
      aadhar_number:
        this.profile.documents && this.profile.documents.length
          ? this.profile.documents[0].document_number
          : '',
      aadhar_media_type:
        this.profile.documents &&
        this.profile.documents.length &&
        this.profile.documents[0].media &&
        this.profile.documents[0].media.attachment_type
          ? this.profile.documents[0].media.attachment_type
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
    if (this.profile.documents && this.profile.documents.length !== 0) {
      this.profile.documents.forEach((element: any) => {
        let fileLink: any = this.environment.mediaUrl;
        let rootMedia: any = element.media || element.link;

        if (element.type === 'aadhar') {
          if (element.media.attachment_type === 'pdf') {
            this.aadhar_url = fileLink + rootMedia.document;
          } else if (element.media.attachment_type === 'image') {
            this.aadhar_front_url = fileLink + rootMedia.doc_front;
            this.aadhar_back_url = fileLink + rootMedia.doc_back;
          }
          this.player_photo_url = fileLink + rootMedia.user_photo;
        }
        if (element.type === 'employment_contract') {
          this.employment_contract_url = fileLink + rootMedia.document;
        }
        if (
          element.type !== 'employment_contract' &&
          element.type !== 'aadhar'
        ) {
          this.document_url = fileLink + rootMedia.document;
        }
      });
    }
  }

  populateDynamicControl(data: any, func: any) {
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        func(data[i]);
      }
    }
  }

  populateDynamicPosition() {
    for (let i = 0; i < 3; i++) {
      this.preparePosition(this.profile.position[i], i);
    }
  }

  addContactPerson = (data?: contactPersonObject) => {
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
  };

  removeContactPerson(i: number) {
    this.contact_person.removeAt(i);
  }

  addTrophy = (data?: trophyObject) => {
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
  };

  removeTrophy(i: number) {
    this.trophies.removeAt(i);
  }

  addTopSigning = (data?: topSigningObject) => {
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
  };

  removeTopSigning(i: number) {
    this.top_signings.removeAt(i);
  }

  addTopAcademyPlayer = (data?: topAcademyPlayerObject) => {
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
  };

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
