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

interface clubAcadArrayContext {
  name: string;
  email: string;
  address: string;
  mobile: string;
  aiffNumber: string;
}

@Component({
  selector: 'app-add-edit-employment-contract',
  templateUrl: './add-edit-employment-contract.component.html',
  styleUrls: ['./add-edit-employment-contract.component.scss']
})
export class AddEditEmploymentContractComponent implements OnInit, OnDestroy {
  panelOptions: Partial<PanelOptions> = {
    player_type: false,
    logout_link: true,
    achievements: true,
    footplayers: true,
    is_public: false
  };

  profile: any;
  addEditContractForm: FormGroup;
  fiveYearFromNow = new Date();
  yesterday = new Date();
  category = '';
  clubAcadArray: clubAcadArrayContext[] = [];

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
    private _activatedRoute: ActivatedRoute
  ) {
    this.createForm();
    this.manageCommonControls();
    this.setCategory('club');
    this.setYears();
    this._activatedRoute.params.subscribe(param => {
      if (param.send_to) {
        this.send_to = param.send_to;
      } else if (param.contract_id) {
        this.contract_id = param.contract_id;
        if (this.contractData) {
          this.isEditMode = true;
          this.populateView();
        }
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

  setPlayerValidators() {
    const clubAcademyName = this.addEditContractForm.get('clubAcademyName');
    const otherName = this.addEditContractForm.get('otherName');
    const otherEmail = this.addEditContractForm.get('otherEmail');
    const otherPhoneNumber = this.addEditContractForm.get('otherPhoneNumber');

    const clubAcademyPhoneNumber = this.addEditContractForm.get(
      'clubAcademyPhoneNumber'
    );

    let otherControl: { [name: string]: ValidatorFn[] } = {
      otherName: [Validators.required],
      otherEmail: [Validators.required, Validators.email],
      otherPhoneNumber: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/)
      ]
    };

    let clubAcademyPhoneNumberControl = {
      clubAcademyPhoneNumber: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/)
      ]
    };

    this.setControlValidation(this.addEditContractForm, otherControl);
    clubAcademyName.valueChanges.subscribe(value => {
      if (value === 'Others') {
        otherName.setValue('');
        otherEmail.setValue('');
        otherPhoneNumber.setValue('');
        clubAcademyPhoneNumber.setValue('');

        this.checkRequiredValidator(otherControl, otherControl.otherName, 1);
        this.checkRequiredValidator(otherControl, otherControl.otherEmail, 1);
        this.checkRequiredValidator(
          otherControl,
          otherControl.otherPhoneNumber,
          1
        );
        this.setControlValidation(this.addEditContractForm, otherControl);

        this.checkRequiredValidator(
          clubAcademyPhoneNumberControl,
          clubAcademyPhoneNumberControl.clubAcademyPhoneNumber,
          2
        );
        this.setControlValidation(
          this.addEditContractForm,
          clubAcademyPhoneNumberControl
        );

        otherPhoneNumber.valueChanges
          .pipe(distinctUntilChanged())
          .subscribe(value => {
            if (value) {
              this.checkRequiredValidator(
                otherControl,
                otherControl.otherEmail,
                2
              );
            } else {
              this.checkRequiredValidator(
                otherControl,
                otherControl.otherEmail,
                1
              );
            }
            this.setControlValidation(this.addEditContractForm, otherControl);
          });

        otherEmail.valueChanges
          .pipe(distinctUntilChanged())
          .subscribe(value => {
            if (value) {
              this.checkRequiredValidator(
                otherControl,
                otherControl.otherPhoneNumber,
                2
              );
            } else {
              this.checkRequiredValidator(
                otherControl,
                otherControl.otherPhoneNumber,
                1
              );
            }
            this.setControlValidation(this.addEditContractForm, otherControl);
          });
      } else {
        otherName.setValue('');
        otherEmail.setValue('');
        otherPhoneNumber.setValue('');
        clubAcademyPhoneNumber.setValue('');
        this.checkRequiredValidator(otherControl, otherControl.otherName, 2);
        this.checkRequiredValidator(otherControl, otherControl.otherEmail, 2);
        this.checkRequiredValidator(
          otherControl,
          otherControl.otherPhoneNumber,
          2
        );
        this.setControlValidation(this.addEditContractForm, otherControl);

        this.checkRequiredValidator(
          clubAcademyPhoneNumberControl,
          clubAcademyPhoneNumberControl.clubAcademyPhoneNumber,
          1
        );
        this.setControlValidation(
          this.addEditContractForm,
          clubAcademyPhoneNumberControl
        );
      }
    });
  }

  setValidators() {
    if (this.member_type === 'player') {
      this.setPlayerValidators();
    } else if (['club', 'academy'].includes(this.member_type)) {
      let playerEmailControl = {
        playerEmail: [Validators.required, Validators.email]
      };
      this.checkRequiredValidator(
        playerEmailControl,
        playerEmailControl.playerEmail,
        1
      );
      this.setControlValidation(this.addEditContractForm, playerEmailControl);
    }

    const effectiveDate = this.addEditContractForm.get('effectiveDate');

    effectiveDate.valueChanges.subscribe(value => {
      let date = new Date(value);
      date.setFullYear(date.getFullYear() + 5);
      this.fiveYearFromNow = date;
    });
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
    let requestData = this.toFormData(this.addEditContractForm.value);
    this._employmentContractService
      .addContract(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          let { id } = res.data;
          this._toastrService.success(
            'Successful',
            'Contract Added successfully'
          );
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
    let requestData = this.toFormData(this.addEditContractForm.value);
    this._employmentContractService
      .updateContract({ contract_id: this.contract_id, requestData })
      .pipe(untilDestroyed(this))
      .subscribe(
        res => {
          this._toastrService.success(
            'Successful',
            'Contract Updated successfully'
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
          playerName:
            this.profile.first_name && this.profile.last_name
              ? `${this.profile.first_name} ${this.profile.last_name}`
              : '',
          playerMobileNumber: this.profile.phone ? this.profile.phone : '',
          playerEmail: this.profile.email ? this.profile.email : ''
        });
      } else {
        this.addEditContractForm.patchValue({
          clubAcademyName: this.profile.name ? this.profile.name : '',
          clubAcademyPhoneNumber: this.profile.phone ? this.profile.phone : '',
          clubAcademyEmail: this.profile.email ? this.profile.email : '',
          clubAcademyAddress:
            this.profile.address && this.profile.address.full_address
              ? this.profile.address.full_address
              : '',
          aiffNumber:
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
    this.setCategory(this.contractData.category);

    if (
      this.contractData.clubAcademyIntermediaryName &&
      this.contractData.clubAcademyTransferFee
    )
      this.addEditContractForm
        .get('clubAcademyUsesAgentServices')
        .setValue('true');
    else
      this.addEditContractForm
        .get('clubAcademyUsesAgentServices')
        .setValue('false');
    if (
      this.contractData.playerIntermediaryName &&
      this.contractData.playerTransferFee
    )
      this.addEditContractForm.get('playerUsesAgentServices').setValue('true');
    else
      this.addEditContractForm.get('playerUsesAgentServices').setValue('false');

    this.addEditContractForm.patchValue({
      category: this.contractData.category ? this.contractData.category : '',
      playerName: this.contractData.playerName
        ? this.contractData.playerName
        : '',
      clubAcademyName: this.contractData.clubAcademyName
        ? this.contractData.clubAcademyName
        : '',
      signingDate: this.contractData.signingDate
        ? this.contractData.signingDate
        : '',
      effectiveDate: this.contractData.effectiveDate
        ? this.contractData.effectiveDate
        : '',
      expiryDate: this.contractData.expiryDate
        ? this.contractData.expiryDate
        : '',
      placeOfSignature: this.contractData.placeOfSignature
        ? this.contractData.placeOfSignature
        : '',
      clubAcademyRepresentativeName: this.contractData
        .clubAcademyRepresentativeName
        ? this.contractData.clubAcademyRepresentativeName
        : '',
      clubAcademyAddress: this.contractData.clubAcademyAddress
        ? this.contractData.clubAcademyAddress
        : '',
      clubAcademyPhoneNumber: this.contractData.clubAcademyPhoneNumber
        ? this.contractData.clubAcademyPhoneNumber
        : '',
      clubAcademyEmail: this.contractData.clubAcademyEmail
        ? this.contractData.clubAcademyEmail
        : '',
      aiffNumber: this.contractData.aiffNumber
        ? this.contractData.aiffNumber
        : '',
      crsUserName: this.contractData.crsUserName
        ? this.contractData.crsUserName
        : '',
      legalGuardianName: this.contractData.legalGuardianName
        ? this.contractData.legalGuardianName
        : '',
      playerAddress: this.contractData.playerAddress
        ? this.contractData.playerAddress
        : '',
      playerMobileNumber: this.contractData.playerMobileNumber
        ? this.contractData.playerMobileNumber
        : '',
      playerEmail: this.contractData.playerEmail
        ? this.contractData.playerEmail
        : '',
      clubAcademyIntermediaryName: this.contractData.clubAcademyIntermediaryName
        ? this.contractData.clubAcademyIntermediaryName
        : '',
      clubAcademyTransferFee: this.contractData.clubAcademyTransferFee
        ? this.contractData.clubAcademyTransferFee
        : '',
      playerIntermediaryName: this.contractData.playerIntermediaryName
        ? this.contractData.playerIntermediaryName
        : '',
      playerTransferFee: this.contractData.playerTransferFee
        ? this.contractData.playerTransferFee
        : '',

      otherName: this.contractData.otherName ? this.contractData.otherName : '',
      otherEmail: this.contractData.otherEmail
        ? this.contractData.otherEmail
        : '',
      otherPhoneNumber: this.contractData.otherPhoneNumber
        ? this.contractData.otherPhoneNumber
        : ''
    });
  }

  onSelectOption(c: HTMLSelectElement) {
    let identity = c.selectedOptions[0].attributes['identity'];
    if (!identity) {
      this.addEditContractForm.patchValue({
        clubAcademyAddress: '',
        clubAcademyPhoneNumber: '',
        aiffNumber: '',
        clubAcademyEmail: ''
      });
      return;
    }

    let email = identity.value;
    let selectedClubAcad = this.clubAcadArray.filter(
      value => value.email === email
    );

    let item = selectedClubAcad[0];
    this.addEditContractForm.patchValue({
      clubAcademyAddress: item.address ? item.address : '',
      clubAcademyPhoneNumber: item.mobile ? item.mobile : '',
      aiffNumber: item.aiffNumber ? item.aiffNumber : '',
      clubAcademyEmail: item.email ? item.email : ''
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
        name: 'playerName',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'clubAcademyName',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'signingDate',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'effectiveDate',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'expiryDate',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'placeOfSignature',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'clubAcademyRepresentativeName',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'clubAcademyAddress',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'clubAcademyPhoneNumber',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'clubAcademyEmail',
        abstractControl: this._formBuilder.control('', [Validators.email])
      },
      {
        name: 'aiffNumber',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'crsUserName',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'legalGuardianName',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'playerAddress',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'playerMobileNumber',
        abstractControl: this._formBuilder.control('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/)
        ])
      },
      {
        name: 'playerEmail',
        abstractControl: this._formBuilder.control('', [Validators.email])
      },
      {
        name: 'clubAcademyUsesAgentServices',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'clubAcademyIntermediaryName',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'clubAcademyTransferFee',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'playerUsesAgentServices',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'playerIntermediaryName',
        abstractControl: this._formBuilder.control('')
      },
      {
        name: 'playerTransferFee',
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
        otherName: ['', []],
        otherEmail: ['', []],
        otherPhoneNumber: ['', []]
      });
    }
  }
}
