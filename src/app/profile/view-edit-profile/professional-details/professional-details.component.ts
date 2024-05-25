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

interface trophyObject {
  name: string;
  year: string;
  position: string;
}

interface contactPersonObject {
  designation: string;
  name: string;
  email: string;
  mobile_number: string;
}

interface topSigningObject {
  name: string;
}

let trophyControl = {
  trophies: [Validators.required]
};

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.scss']
})
export class ProfessionalDetailsComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();

  position: FormArray;
  contact_person: FormArray;
  trophies: FormArray;
  top_signings: FormArray;
  environment = environment;
  positionArray: GetPositionListResponseContext['data']['records'];
  strongFootArray = Constants.STRONG_FOOT;
  designationArray = Constants.DESIGNATION_ARRAY;
  clubAcadTypeArray = Constants.CLUB_ACAD_TYPE_ARRAY;
  stateAssociationArray = Constants.STATE_ASSOCIATION_ARRAY;
  leagueArray = Constants.LEAGUE_ARRAY;
  //coache_role_array = Constants.coache_ROLE_ARRAY;
  coache_role_array: any[] = [];
  area_of_specialization_Array: any[] = [];
  lanuage_spoken_Array = Constants.LANGUAGE_SPOKEN_ARRAY;
  preferred_traning_style_Array: any[] = [];
  professionalDetailsForm: FormGroup;
  professionalDetails: GetProfessionalDetailsResponseContext['data'];
  member_type: string = localStorage.getItem('member_type');
  viewMode = true;
  showRemoveTrophy = false;
  default = false;
  default1 = false;
  default2 = false;
  optionValue = '';
  obj = {};

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
    if (this.member_type === 'player' || this.member_type === 'coache') {
      this.position.clear();
    } else {
      this.contact_person.clear();
      this.trophies.clear();
      this.top_signings.clear();
    }
  }

  ngOnInit() {
    this._professionalDetailsService
      .getCoachRole()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          console.log('response of coachrole', response.data[0]);
          this.coache_role_array = response.data[0];
          // this.positionArray = response.data.records;
        },
        error => {}
      );
    this.setCategoryValidators();
    this.getSpecilisation();
    this.getCoachTraningStyle();
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
    } else {
      func([]);
    }
  }

  populateDynamicPosition() {
    for (let i = 0; i < 3; i++) {
      this.preparePosition(this.professionalDetails.position[i], i);
    }
  }

  onSelectNewRole(event: any) {
    console.log(event.target.value);
    if (event.target.value === 'other') {
      this.default = true;
    }
  }
  onSelectNewSpecilisation(event: any) {
    console.log(event.target.value);
    if (event.target.value === 'other') {
      this.default1 = true;
    }
  }

  onSelectNewTraningStyle(event: any) {
    console.log(event.target.value);
    if (event.target.value === 'other') {
      this.default2 = true;
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
  getSpecilisation() {
    this._professionalDetailsService
      .getAreaOfSpecialisation()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          console.log('response of coachrole', response.data);
          this.area_of_specialization_Array = response.data[0];
          // this.positionArray = response.data.records;
        },
        error => {}
      );
  }

  getCoachTraningStyle() {
    this._professionalDetailsService
      .getNewTraningStyle()
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          console.log('response of traningstyle', response.data);
          this.preferred_traning_style_Array = response.data[0];
          // this.positionArray = response.data.records;
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
          console.log('professional details subscribe is', response.data);
          this.populateFormFields();
          if (
            this.professionalDetails.member_type === 'player' ||
            this.professionalDetails.member_type === 'coache'
          ) {
            this.getPositionList();
            this.populateDynamicPosition();
          }
          if (
            ['club', 'academy'].includes(this.professionalDetails.member_type)
          ) {
            let controlFuncObject = {
              contact_person: [
                this.professionalDetails.contact_person,
                this.addContactPerson
              ],
              trophies: [this.professionalDetails.trophies, this.addTrophy],
              top_signings: [
                this.professionalDetails.top_signings,
                this.addTopSigning
              ]
            };

            for (const key in controlFuncObject) {
              this.populateDynamicControl(
                controlFuncObject[key][0],
                controlFuncObject[key][1]
              );
            }
          }
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  populateFormFields() {
    if (this.member_type === 'player' || this.member_type === 'coache') {
      if (this.professionalDetails.associated_club_academy === 'yes')
        this.professionalDetailsForm
          .get('associated_club_academy')
          .setValue('yes');
      else
        this.professionalDetailsForm
          .get('associated_club_academy')
          .setValue('no');
    }

    this.professionalDetailsForm.patchValue({
      strong_foot: this.professionalDetails.strong_foot
        ? this.professionalDetails.strong_foot
        : '',
      weak_foot: this.professionalDetails.weak_foot
        ? this.professionalDetails.weak_foot
        : '',
      head_coache_name: this.professionalDetails.club_academy_details
        ? this.professionalDetails.club_academy_details.head_coache_name
        : '',
      head_coache_phone: this.professionalDetails.club_academy_details
        ? this.professionalDetails.club_academy_details.head_coache_phone
        : '',
      head_coache_email: this.professionalDetails.club_academy_details
        ? this.professionalDetails.club_academy_details.head_coache_email
        : '',
      former_club_academy: this.professionalDetails.former_club_academy
        ? this.professionalDetails.former_club_academy
        : '',
      association: this.professionalDetails.association
        ? this.professionalDetails.association
        : '',
      league: this.professionalDetails.league
        ? this.professionalDetails.league
        : '',
      current_role: this.professionalDetails.current_role
        ? this.professionalDetails.current_role
        : '',
      year_of_exp: this.professionalDetails.year_of_exp
        ? this.professionalDetails.year_of_exp
        : '',
      coache_certificate: this.professionalDetails.coache_certificate
        ? this.professionalDetails.coache_certificate
        : '',
      area_of_spec: this.professionalDetails.area_of_spec
        ? this.professionalDetails.area_of_spec
        : '',
      coacheing_philo: this.professionalDetails.coacheing_philo
        ? this.professionalDetails.coacheing_philo
        : '',
      language: this.professionalDetails.language
        ? this.professionalDetails.language
        : '',
      new_role: this.professionalDetails.new_role
        ? this.professionalDetails.new_role
        : '',
      traning_style: this.professionalDetails.traning_style
        ? this.professionalDetails.traning_style
        : '',
      other_specilisation: this.professionalDetails.other_specilisation
        ? this.professionalDetails.other_specilisation
        : '',
      other_traning_style: this.professionalDetails.other_traning_style
        ? this.professionalDetails.other_traning_style
        : '',
      academy_name: this.professionalDetails.academy_name
        ? this.professionalDetails.academy_name
        : '',
      type: this.professionalDetails.type ? this.professionalDetails.type : '',
      league_other: this.professionalDetails.league_other
        ? this.professionalDetails.league_other
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

    if (this.member_type == 'academy' || this.member_type === 'club') {
      let clubAcadCommonControls = [
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
          name: 'trophies',
          abstractControl: this._formBuilder.array([])
        }
      ];
      this.formControlAdder(
        this.professionalDetailsForm,
        clubAcadCommonControls
      );
    }
  }

  createForm() {
    if (this.member_type === 'player' || this.member_type === 'coache') {
      this.professionalDetailsForm = this._formBuilder.group({
        position: this._formBuilder.array([]),
        strong_foot: [''],
        associated_club_academy: ['', [Validators.required]],
        weak_foot: ['', []],
        head_coache_name: [''],
        head_coache_phone: [''],
        head_coache_email: [''],
        former_club_academy: [''],
        current_role: [''],
        year_of_exp: [''],
        academy_name: [''],
        coache_certificate: [''],
        area_of_spec: [''],
        coacheing_philo: [''],
        other_current_role: [''],
        other_traning_style: [''],
        other_specilisation: [''],
        language: [''],
        traning_style: []
      });
    } else if (this.member_type !== 'player') {
      this.professionalDetailsForm = this._formBuilder.group({
        top_signings: this._formBuilder.array([], [])
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
    const head_coache_phone = this.professionalDetailsForm.get(
      'head_coache_phone'
    );
    const head_coache_email = this.professionalDetailsForm.get(
      'head_coache_email'
    );
    const head_coache_name = this.professionalDetailsForm.get(
      'head_coache_name'
    );

    let headcoacheControl = {
      head_coache_phone: [
        // Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/)
      ],
      head_coache_email: [Validators.email],
      head_coache_name: [
        // Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\&\-\(\) ]+$/)
      ]
    };
    this.setControlValidation(this.professionalDetailsForm, headcoacheControl);

    this.professionalDetailsForm
      .get('associated_club_academy')
      .valueChanges.subscribe(value => {
        if (value === 'yes') {
          this.checkRequiredValidator(
            this.professionalDetailsForm,
            { head_coache_phone: headcoacheControl.head_coache_phone },
            true
          );
          this.checkRequiredValidator(
            this.professionalDetailsForm,
            { head_coache_name: headcoacheControl.head_coache_name },
            true
          );
        } else if (value === 'no') {
          head_coache_phone.setValue(''); // setValue use to clear any input provided
          head_coache_email.setValue('');
          head_coache_name.setValue('');
          this.checkRequiredValidator(
            this.professionalDetailsForm,
            { head_coache_phone: headcoacheControl.head_coache_phone },
            false
          );
          this.checkRequiredValidator(
            this.professionalDetailsForm,
            { head_coache_name: headcoacheControl.head_coache_name },
            false
          );
        }
      });
  }

  setCategoryValidators() {
    if (this.member_type === 'player' || this.member_type === 'coache') {
      this.setPlayerValidators();
    } else if (this.member_type === 'club') {
      this.checkRequiredValidator(
        this.professionalDetailsForm,
        { trophies: trophyControl.trophies },
        false
      );
      this.showRemoveTrophy = true;
    } else if (this.member_type === 'academy') {
      this.setControlValidation(this.professionalDetailsForm, trophyControl);
    }

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
    console.log('before formData return', formData);
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

    if (this.member_type === 'player' || this.member_type === 'coache') {
      this.setRequestDataObject(requestData, 'position');
    } else if (this.member_type === 'club' || this.member_type === 'academy') {
      this.setRequestDataObject(requestData, 'contact_person');
      this.setRequestDataObject(requestData, 'trophies');
      this.setRequestDataObject(requestData, 'top_signings');
    }

    this._professionalDetailsService
      .editProfessionalDetails(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success(
            'Success',
            'Professional details updated successfully'
          );
          this.toggleMode();
          this.clearFormArray();
          this.populateView();
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

  addContactPerson = (data?: contactPersonObject) => {
    this.contact_person = this.professionalDetailsForm.get(
      'contact_person'
    ) as FormArray;

    if (data !== undefined && Object.keys(data).length) {
      this.contact_person.push(
        this._formBuilder.group({
          designation: [data.designation, [Validators.required]],
          name: [data.name, [Validators.required]],
          email: [data.email, [Validators.required, Validators.email]],
          mobile_number: [
            data.mobile_number,
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
          mobile_number: [
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
    this.trophies = this.professionalDetailsForm.get('trophies') as FormArray;

    if (data !== undefined && Object.keys(data).length) {
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
    this.top_signings = this.professionalDetailsForm.get(
      'top_signings'
    ) as FormArray;

    if (data !== undefined && Object.keys(data).length) {
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

  ngOnDestroy() {}
}
