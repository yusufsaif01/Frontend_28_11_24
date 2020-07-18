import { Component, OnInit, OnDestroy } from '@angular/core';
import { untilDestroyed } from '@app/core';
import { Constants } from '@app/shared/static-data/static-data';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormArray
} from '@angular/forms';
import {
  ProfessionalDetailsService,
  GetProfessionalDetailsResponseContext,
  GetPositionListResponseContext
} from './professional-details.service';

interface PositionContext {
  id: string;
  name: string;
}

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.scss']
})
export class ProfessionalDetailsComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  position: FormArray;
  environment = environment;
  positionArray: GetPositionListResponseContext['data']['records'];
  strongFootArray = Constants.STRONG_FOOT;
  stateAssociationArray = Constants.STATE_ASSOCIATION_ARRAY;
  professionalDetailsForm: FormGroup;
  professionalDetails: GetProfessionalDetailsResponseContext['data'];
  member_type: string = localStorage.getItem('member_type');
  viewMode = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _professionalDetailsService: ProfessionalDetailsService,
    private _toastrService: ToastrService
  ) {
    this.createForm();
    this.manageCommonControls();
    this.populateView();
  }

  clearFormArray() {
    this.position.clear();
  }

  ngOnInit() {
    this.setCategoryValidators();
  }

  toggleMode() {
    this.viewMode = !this.viewMode;
  }

  preparePosition(data?: PositionContext, index?: number) {
    this.position = this.professionalDetailsForm.get('position') as FormArray;

    if (data !== undefined) {
      this.position.push(
        this._formBuilder.group({
          priority: index + 1,
          id: [data.id, []],
          name: data.name
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

  populateDynamicControl(data: any, func: any) {
    if (data.length !== 0) {
      for (let i = 0; i < data.length; i++) {
        func(data[i]);
      }
    }
  }

  populateDynamicPosition() {
    for (let i = 0; i < 3; i++) {
      this.preparePosition(this.professionalDetails.position[i], i);
    }
  }

  getPositionList() {
    this._professionalDetailsService
      .getPositionList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.positionArray = response.data.records;
        },
        error => {}
      );
  }

  populateView() {
    this._professionalDetailsService
      .getProfessionalDetails()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.professionalDetails = response.data;
          this.populateFormFields();
          if (this.professionalDetails.member_type === 'player') {
            this.getPositionList();
            this.populateDynamicPosition();
          }

          this._toastrService.success(
            'Successful',
            'Data retrieved successfully'
          );
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  populateFormFields() {
    if (this.professionalDetails.associated_club_academy === 'yes')
      this.professionalDetailsForm
        .get('associated_club_academy')
        .setValue('yes');
    else
      this.professionalDetailsForm
        .get('associated_club_academy')
        .setValue('no');

    this.professionalDetailsForm.patchValue({
      strong_foot: this.professionalDetails.strong_foot
        ? this.professionalDetails.strong_foot
        : '',
      weak_foot: this.professionalDetails.weak_foot
        ? this.professionalDetails.weak_foot
        : '',
      head_coach_name: this.professionalDetails.club_academy_details
        ? this.professionalDetails.club_academy_details.head_coach_name
        : '',
      head_coach_phone: this.professionalDetails.club_academy_details
        ? this.professionalDetails.club_academy_details.head_coach_phone
        : '',
      head_coach_email: this.professionalDetails.club_academy_details
        ? this.professionalDetails.club_academy_details.head_coach_email
        : '',
      former_club_academy: this.professionalDetails.former_club_academy
        ? this.professionalDetails.former_club_academy
        : '',
      association: this.professionalDetails.association
        ? this.professionalDetails.association
        : '',
      association_other: this.professionalDetails.association_other
        ? this.professionalDetails.association_other
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
        name: 'association',
        abstractControl: this._formBuilder.control('', [Validators.required])
      },
      {
        name: 'association_other',
        abstractControl: this._formBuilder.control('')
      }
    ];
    this.formControlAdder(this.professionalDetailsForm, commonControls);
  }

  createForm() {
    if (this.member_type === 'player') {
      this.professionalDetailsForm = this._formBuilder.group({
        position: this._formBuilder.array([]),
        strong_foot: [''],
        associated_club_academy: ['', [Validators.required]],
        weak_foot: ['', []],
        head_coach_name: [''],
        head_coach_phone: [''],
        head_coach_email: [''],
        former_club_academy: ['']
      });
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

  setPlayerValidators() {
    const head_coach_phone = this.professionalDetailsForm.get(
      'head_coach_phone'
    );
    const head_coach_email = this.professionalDetailsForm.get(
      'head_coach_email'
    );
    const head_coach_name = this.professionalDetailsForm.get('head_coach_name');

    let headCoachControl = {
      head_coach_phone: [
        // Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/)
      ],
      head_coach_email: [Validators.email],
      head_coach_name: [
        // Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\&\-\(\) ]+$/)
      ]
    };
    this.setControlValidation(this.professionalDetailsForm, headCoachControl);

    this.professionalDetailsForm
      .get('associated_club_academy')
      .valueChanges.subscribe(value => {
        if (value === 'yes') {
          this.checkRequiredValidator(
            this.professionalDetailsForm,
            { head_coach_phone: headCoachControl.head_coach_phone },
            true
          );
          this.checkRequiredValidator(
            this.professionalDetailsForm,
            { head_coach_name: headCoachControl.head_coach_name },
            true
          );
        } else if (value === 'no') {
          head_coach_phone.setValue(''); // setValue use to clear any input provided
          head_coach_email.setValue('');
          head_coach_name.setValue('');
          this.checkRequiredValidator(
            this.professionalDetailsForm,
            { head_coach_phone: headCoachControl.head_coach_phone },
            false
          );
          this.checkRequiredValidator(
            this.professionalDetailsForm,
            { head_coach_name: headCoachControl.head_coach_name },
            false
          );
        }
      });
  }

  setCategoryValidators() {
    const associationOther = this.professionalDetailsForm.get(
      'association_other'
    );
    this.professionalDetailsForm
      .get('association')
      .valueChanges.subscribe(association => {
        if (association !== 'Others') {
          associationOther.setValue('');
        }
      });
    associationOther.updateValueAndValidity();
    if (this.member_type === 'player') {
      this.setPlayerValidators();
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
    requestData.set(
      name,
      JSON.stringify(this.professionalDetailsForm.get(name).value)
    );
  }

  editProfessionalDetails() {
    let requestData = this.toFormData(this.professionalDetailsForm.value);

    if (this.member_type === 'player') {
      this.setRequestDataObject(requestData, 'position');
    }

    this._professionalDetailsService
      .editProfessionalDetails(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success(
            'Successful',
            'Professional Details updated successfully'
          );
          this.clearFormArray();
          this.populateView();
          this.toggleMode();
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
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

  ngOnDestroy() {}
}
