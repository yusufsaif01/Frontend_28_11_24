import { Component, OnInit, OnDestroy } from '@angular/core';
import { PanelOptions } from '@app/shared/models/panel-options.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { AddEditEmploymentContractService } from './add-edit-employment-contract.service';
import { untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { DateConversion } from '@app/shared/utilities/date-conversion';

interface clubAcadArrayContext {
  name: string;
  email: string;
  address: string;
  mobile: string;
  aiff_number: string;
  user_id: string;
}

let clubAcademyPhoneNumberControl = {
  club_academy_phone_number: [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern(/^\d+$/)
  ]
};
let otherControl: { [name: string]: ValidatorFn[] } = {
  other_name: [Validators.required],
  other_email: [Validators.required, Validators.email],
  other_phone_number: [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern(/^\d+$/)
  ]
};

let playerEmailControl = {
  player_email: [Validators.required, Validators.email]
};

@Component({
  selector: 'app-add-edit-employment-contract',
  templateUrl: './add-edit-employment-contract.component.html',
  styleUrls: ['./add-edit-employment-contract.component.scss'],
  providers: [DateConversion]
})
export class AddEditEmploymentContractComponent implements OnInit, OnDestroy {
  panelOptions: Partial<PanelOptions> = {
    player_type: false,
    logout_link: true,
    achievements: true,
    footplayers: true,
    is_public: false
  };

  playerAge: number;
  showLegalGuardStar = false;
  profile: any;
  addEditContractForm: FormGroup;
  fiveYearFromNow = new Date();
  yesterday = new Date();
  category = '';
  clubAcadArray: clubAcadArrayContext[] = [];
  playerDetails: any = {};

  send_to: string;
  contract_id: string;
  contractData: any;
  isEditMode = false;

  member_type: string = localStorage.getItem('member_type');

  constructor(
    private _formBuilder: FormBuilder,
    private _employmentContractService: AddEditEmploymentContractService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dateConversion: DateConversion
  ) {
    this.createForm();
    this.manageCommonControls();
    this.setCategory('club');
    this.setYears();
    this._activatedRoute.params.subscribe(param => {
      if (param.send_to) {
        this.send_to = param.send_to;
        this.getPlayerDetails(this.send_to);
      } else if (param.contract_id) {
        this.contract_id = param.contract_id;
        this.isEditMode = true;
        this.populateView();
      } else {
        this.getPlayerDetails(localStorage.getItem('user_id'));
      }
    });
  }

  ngOnDestroy() {}

  ngOnInit() {
    this.setValidators();
  }

  setYears() {
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  getMemberType(value: string) {
    this.member_type = value;
    if (['club', 'academy'].includes(this.member_type)) {
      this.setCategory(this.member_type);
    }
  }

  getClubAcademyList() {
    this._employmentContractService
      .getClubAcademyList({ role: this.category })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.clubAcadArray = response.data;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  getPlayerDetails(player_id: string) {
    this._employmentContractService
      .getPlayerDetails({ user_id: player_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.playerDetails = response.data;
          this.playerAge = this.playerDetails.age;
          if (
            ['club', 'academy'].includes(this.member_type) &&
            !this.isEditMode
          ) {
            this.setPlayerDetails();
          }
          this.setAsyncValidators();
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  setPlayerDetails() {
    this.addEditContractForm.patchValue({
      player_name: this.playerDetails.name ? this.playerDetails.name : '',
      player_mobile_number: this.playerDetails.mobile
        ? this.playerDetails.mobile
        : '',
      player_email: this.playerDetails.email ? this.playerDetails.email : ''
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

  setPlayerValidators() {
    const club_academy_name = this.addEditContractForm.get('club_academy_name');
    const other_name = this.addEditContractForm.get('other_name');
    const other_email = this.addEditContractForm.get('other_email');
    const other_phone_number = this.addEditContractForm.get(
      'other_phone_number'
    );

    const club_academy_phone_number = this.addEditContractForm.get(
      'club_academy_phone_number'
    );

    this.setControlValidation(this.addEditContractForm, otherControl);
    this.setControlValidation(
      this.addEditContractForm,
      clubAcademyPhoneNumberControl
    );
    club_academy_name.valueChanges.subscribe(value => {
      if (value === 'Others') {
        other_name.setValue('');
        other_email.setValue('');
        other_phone_number.setValue('');
        club_academy_phone_number.setValue('');
        this.checkRequiredValidator(
          this.addEditContractForm,
          { other_name: otherControl.other_name },
          true
        );

        this.checkRequiredValidator(
          this.addEditContractForm,
          { other_email: otherControl.other_email },
          true
        );

        this.checkRequiredValidator(
          this.addEditContractForm,
          { other_phone_number: otherControl.other_phone_number },
          true
        );

        this.checkRequiredValidator(
          this.addEditContractForm,
          {
            club_academy_phone_number:
              clubAcademyPhoneNumberControl.club_academy_phone_number
          },
          false
        );
        other_phone_number.valueChanges
          .pipe(distinctUntilChanged())
          .subscribe(value => {
            if (value) {
              this.checkRequiredValidator(
                this.addEditContractForm,
                { other_email: otherControl.other_email },
                false
              );
            } else {
              this.checkRequiredValidator(
                this.addEditContractForm,
                { other_email: otherControl.other_email },
                true
              );
            }
          });

        other_email.valueChanges
          .pipe(distinctUntilChanged())
          .subscribe(value => {
            if (value) {
              this.checkRequiredValidator(
                this.addEditContractForm,
                { other_phone_number: otherControl.other_phone_number },
                false
              );
            } else {
              this.checkRequiredValidator(
                this.addEditContractForm,
                { other_phone_number: otherControl.other_phone_number },
                true
              );
            }
          });
      } else {
        other_name.setValue('');
        other_email.setValue('');
        other_phone_number.setValue('');
        club_academy_phone_number.setValue('');
        this.checkRequiredValidator(
          this.addEditContractForm,
          { other_name: otherControl.other_name },
          false
        );
        this.checkRequiredValidator(
          this.addEditContractForm,
          { other_email: otherControl.other_email },
          false
        );
        this.checkRequiredValidator(
          this.addEditContractForm,
          { other_phone_number: otherControl.other_phone_number },
          false
        );

        this.checkRequiredValidator(
          this.addEditContractForm,
          {
            club_academy_phone_number:
              clubAcademyPhoneNumberControl.club_academy_phone_number
          },
          true
        );
      }
    });
  }

  setValidators() {
    if (this.member_type === 'player') {
      this.setPlayerValidators();
    } else if (['club', 'academy'].includes(this.member_type)) {
      this.checkRequiredValidator(
        this.addEditContractForm,
        { player_email: playerEmailControl.player_email },
        true
      );
      this.setControlValidation(
        this.addEditContractForm,
        clubAcademyPhoneNumberControl
      );
    }

    const effectiveDate = this.addEditContractForm.get('effective_date');

    const playerUsesAgentServices = this.addEditContractForm.get(
      'player_uses_agent_services'
    );
    const playerIntermediaryName = this.addEditContractForm.get(
      'player_intermediary_name'
    );
    const playerTransferFee = this.addEditContractForm.get(
      'player_transfer_fee'
    );
    const clubAcademyUsesAgentServices = this.addEditContractForm.get(
      'club_academy_uses_agent_services'
    );
    const clubAcademyIntermediaryName = this.addEditContractForm.get(
      'club_academy_intermediary_name'
    );
    const clubAcademyTransferFee = this.addEditContractForm.get(
      'club_academy_transfer_fee'
    );
    clubAcademyUsesAgentServices.valueChanges.subscribe(value => {
      if (value === 'false') {
        clubAcademyIntermediaryName.setValue('');
        clubAcademyTransferFee.setValue('');
      }
    });
    playerUsesAgentServices.valueChanges.subscribe(value => {
      if (value === 'false') {
        playerIntermediaryName.setValue('');
        playerTransferFee.setValue('');
      }
    });
    effectiveDate.valueChanges.subscribe(value => {
      let date = new Date(value);
      date.setFullYear(date.getFullYear() + 5);
      this.fiveYearFromNow = date;
    });
  }

  setAsyncValidators() {
    let legalGuardianNameControl = {
      legal_guardian_name: [Validators.required]
    };

    if (this.playerAge < 18) {
      this.showLegalGuardStar = true;
      this.checkRequiredValidator(
        this.addEditContractForm,
        { legal_guardian_name: legalGuardianNameControl.legal_guardian_name },
        true
      );
    } else {
      this.showLegalGuardStar = false;
      this.checkRequiredValidator(
        this.addEditContractForm,
        { legal_guardian_name: legalGuardianNameControl.legal_guardian_name },
        false
      );
    }
  }

  setCategory(value: string) {
    this.category = value;
    if (this.member_type === 'player') {
      this.getClubAcademyList();
      this.addEditContractForm.patchValue({
        category: this.category ? this.category : ''
      });
    }
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

  setRequestDataObject(requestData: any, name: string) {
    return requestData.set(
      name,
      JSON.stringify(this.addEditContractForm.get(name).value)
    );
  }

  getCancelRoute() {
    if (this.member_type === 'player') {
      return this.isEditMode
        ? ['/member/profile/view-employment-contract/', this.contract_id]
        : ['/member/profile/edit'];
    } else {
      return this.isEditMode
        ? ['/member/profile/view-employment-contract/', this.contract_id]
        : ['/member/manage-footplayer'];
    }
  }

  addUpdateContract() {
    this.isEditMode ? this.updateContract() : this.addContract();
  }

  addContract() {
    this.dateModifier();

    let requestData = this.toFormData({
      user_id: this.send_to,
      ...this.addEditContractForm.value
    });

    this._employmentContractService
      .addContract(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          let { id } = res.data;
          this._toastrService.success('success', 'Contract added successfully');
          this.addEditContractForm.reset();
          if (this.member_type === 'player') {
            this._router.navigate([
              '/member/profile/view-employment-contract/',
              id
            ]);
          } else {
            this._router.navigate(['/member/manage-footplayer']);
          }
        },
        err => {
          this._toastrService.error('Error', err.error.message);
        }
      );
  }

  updateContract() {
    this.dateModifier();

    let requestData = this.toFormData({
      user_id: this.send_to,
      ...this.addEditContractForm.value
    });
    this._employmentContractService
      .updateContract({ contract_id: this.contract_id, requestData })
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          this._toastrService.success(
            'success',
            'Contract updated successfully'
          );
          this.addEditContractForm.reset();
          this._router.navigate([
            '/member/profile/view-employment-contract/',
            this.contract_id
          ]);
        },
        err => {
          this._toastrService.error('Error', err.error.message);
        }
      );
  }

  getProfileData(data: Object) {
    this.profile = data;
    this.setProfileData();
  }

  setProfileData() {
    if (this.profile) {
      if (this.member_type === 'player') {
        this.addEditContractForm.patchValue({
          player_name:
            this.profile.first_name && this.profile.last_name
              ? `${this.profile.first_name} ${this.profile.last_name}`
              : '',
          player_mobile_number: this.profile.phone ? this.profile.phone : '',
          player_email: this.profile.email ? this.profile.email : ''
        });
      } else {
        this.addEditContractForm.patchValue({
          club_academy_name: this.profile.name ? this.profile.name : '',
          club_academy_phone_number: this.profile.phone
            ? this.profile.phone
            : '',
          club_academy_email: this.profile.email ? this.profile.email : '',
          club_academy_address:
            this.profile.address && this.profile.address.full_address
              ? this.profile.address.full_address
              : '',
          aiff_number:
            this.profile.documents && this.profile.documents.length
              ? this.profile.documents[0].document_number
              : ''
        });
      }
    }
  }

  populateView() {
    this._employmentContractService
      .getContract({ contract_id: this.contract_id })
      .subscribe(
        response => {
          this.contractData = response.data;
          this.populateFormFields();
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  populateFormFields() {
    this.send_to = this.contractData.send_to || '';
    if (['club', 'academy'].includes(this.member_type)) {
      this.getPlayerDetails(this.send_to);
    } else {
      this.getPlayerDetails(this.contractData.sent_by);
    }
    this.setCategory(this.contractData.category);

    if (this.contractData.club_academy_uses_agent_services === true)
      this.addEditContractForm
        .get('club_academy_uses_agent_services')
        .setValue('true');
    else
      this.addEditContractForm
        .get('club_academy_uses_agent_services')
        .setValue('false');
    if (this.contractData.player_uses_agent_services === true)
      this.addEditContractForm
        .get('player_uses_agent_services')
        .setValue('true');
    else
      this.addEditContractForm
        .get('player_uses_agent_services')
        .setValue('false');

    this.addEditContractForm.patchValue({
      category: this.contractData.category ? this.contractData.category : '',
      player_name:
        this.contractData.player_name != ''
          ? this.contractData.player_name
          : this.playerDetails.name,
      club_academy_name: this.contractData.club_academy_name
        ? this.contractData.club_academy_name
        : '',
      signing_date: this.contractData.signing_date
        ? this.contractData.signing_date
        : '',
      effective_date: this.contractData.effective_date
        ? this.contractData.effective_date
        : '',
      expiry_date: this.contractData.expiry_date
        ? this.contractData.expiry_date
        : '',
      place_of_signature: this.contractData.place_of_signature
        ? this.contractData.place_of_signature
        : '',
      club_academy_representative_name: this.contractData
        .club_academy_representative_name
        ? this.contractData.club_academy_representative_name
        : '',
      club_academy_address: this.contractData.club_academy_address
        ? this.contractData.club_academy_address
        : '',
      club_academy_phone_number: this.contractData.club_academy_phone_number
        ? this.contractData.club_academy_phone_number
        : '',
      club_academy_email: this.contractData.club_academy_email
        ? this.contractData.club_academy_email
        : '',
      aiff_number: this.contractData.aiff_number
        ? this.contractData.aiff_number
        : '',
      crs_user_name: this.contractData.crs_user_name
        ? this.contractData.crs_user_name
        : '',
      legal_guardian_name: this.contractData.legal_guardian_name
        ? this.contractData.legal_guardian_name
        : '',
      player_address: this.contractData.player_address
        ? this.contractData.player_address
        : '',
      player_mobile_number: this.contractData.player_mobile_number
        ? this.contractData.player_mobile_number
        : '',
      player_email: this.contractData.player_email
        ? this.contractData.player_email
        : '',
      club_academy_intermediary_name: this.contractData
        .club_academy_intermediary_name
        ? this.contractData.club_academy_intermediary_name
        : '',
      club_academy_transfer_fee: this.contractData.club_academy_transfer_fee
        ? this.contractData.club_academy_transfer_fee
        : '',
      player_intermediary_name: this.contractData.player_intermediary_name
        ? this.contractData.player_intermediary_name
        : '',
      player_transfer_fee: this.contractData.player_transfer_fee
        ? this.contractData.player_transfer_fee
        : '',

      other_name: this.contractData.other_name
        ? this.contractData.other_name
        : '',
      other_email: this.contractData.other_email
        ? this.contractData.other_email
        : '',
      other_phone_number: this.contractData.other_phone_number
        ? this.contractData.other_phone_number
        : ''
    });
  }

  onSelectOption(c: HTMLSelectElement) {
    let identity = c.selectedOptions[0].attributes['identity'];
    if (!identity) {
      this.send_to = '';
      this.addEditContractForm.patchValue({
        club_academy_address: '',
        club_academy_phone_number: '',
        aiff_number: '',
        club_academy_email: ''
      });
      return;
    }

    let email = identity.value;
    let selectedClubAcad = this.clubAcadArray.filter(
      value => value.email === email
    );

    let item = selectedClubAcad[0];
    this.send_to = item.user_id ? item.user_id : '';
    this.addEditContractForm.patchValue({
      club_academy_address: item.address ? item.address : '',
      club_academy_phone_number: item.mobile ? item.mobile : '',
      aiff_number: item.aiff_number ? item.aiff_number : '',
      club_academy_email: item.email ? item.email : ''
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
        name: 'player_name',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'club_academy_name',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'signing_date',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'effective_date',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'expiry_date',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'place_of_signature',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'club_academy_representative_name',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'club_academy_address',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'club_academy_phone_number',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'club_academy_email',
        abstractControl: this._formBuilder.control('', [Validators.email])
      },
      {
        name: 'aiff_number',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'crs_user_name',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'legal_guardian_name',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'player_address',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'player_mobile_number',
        abstractControl: this._formBuilder.control('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/)
        ])
      },
      {
        name: 'player_email',
        abstractControl: this._formBuilder.control('', [Validators.email])
      },
      {
        name: 'club_academy_uses_agent_services',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'club_academy_intermediary_name',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'club_academy_transfer_fee',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'player_uses_agent_services',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'player_intermediary_name',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'player_transfer_fee',
        abstractControl: this._formBuilder.control('')
      }
    ];
    this.formControlAdder(this.addEditContractForm, commonControls);
  }

  createForm() {
    this.addEditContractForm = this._formBuilder.group({});
    if (this.member_type === 'player') {
      this.addEditContractForm = this._formBuilder.group({
        category: ['', [Validators.required]],
        other_name: ['', []],
        other_email: ['', []],
        other_phone_number: ['', []]
      });
    }
  }

  dateModifier() {
    ['signing_date', 'effective_date', 'expiry_date'].forEach(value => {
      let finalDate = this._dateConversion.convert(
        this.addEditContractForm.get(value).value
      );
      this.addEditContractForm.get(value).setValue(finalDate);
    });
  }
}
