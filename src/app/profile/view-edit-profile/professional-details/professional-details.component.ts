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

interface TrophyContext {
  name: string;
  year: string;
  position: string;
}

interface ContactPersonContext {
  designation: string;
  name: string;
  email: string;
  phone_number: string;
}

interface TopSigningContext {
  name: string;
}
interface TopAcademyPlayerContext {
  name: string;
}

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
  contact_person: FormArray;
  trophies: FormArray;
  top_signings: FormArray;
  top_players: FormArray;
  position: FormArray;
  environment = environment;
  positionArray: GetPositionListResponseContext['data']['records'];
  strongFootArray = Constants.STRONG_FOOT;
  designationArray = Constants.DESIGNATION_ARRAY;
  leagueArray = Constants.LEAGUE_ARRAY;
  clubAcadTypeArray = Constants.CLUB_ACAD_TYPE_ARRAY;
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
    this.populateView();
    this.createForm();
    this.manageCommonControls();
    this.setCategoryValidators();
  }

  ngOnInit() {}

  toggleMode() {
    this.viewMode = !this.viewMode;
  }

  addContactPerson = (data?: ContactPersonContext) => {
    this.contact_person = this.professionalDetailsForm.get(
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

  addTrophy = (data?: TrophyContext) => {
    this.trophies = this.professionalDetailsForm.get('trophies') as FormArray;

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

  addTopSigning = (data?: TopSigningContext) => {
    this.top_signings = this.professionalDetailsForm.get(
      'top_signings'
    ) as FormArray;

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

  addTopAcademyPlayer = (data?: TopAcademyPlayerContext) => {
    this.top_players = this.professionalDetailsForm.get(
      'top_players'
    ) as FormArray;

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
          if (
            this.professionalDetails.member_type === 'club' ||
            this.professionalDetails.member_type === 'academy'
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
              ],
              top_players: [
                this.professionalDetails.top_players,
                this.addTopAcademyPlayer
              ]
            };
            for (const key in controlFuncObject) {
              this.populateDynamicControl(
                controlFuncObject[key][0],
                controlFuncObject[key][1]
              );
            }
          }
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
    if (this.professionalDetails.member_type === 'player') {
      if (
        this.professionalDetails.club_academy_details &&
        this.professionalDetails.club_academy_details.head_coach_phone &&
        this.professionalDetails.club_academy_details.head_coach_name
      )
        this.professionalDetailsForm
          .get('associated_club_academy')
          .setValue('yes');
      else
        this.professionalDetailsForm
          .get('associated_club_academy')
          .setValue('no');
    }

    this.professionalDetailsForm.patchValue({
      league: this.professionalDetails.league
        ? this.professionalDetails.league
        : '',
      type: this.professionalDetails.type ? this.professionalDetails.type : '',
      league_other: this.professionalDetails.league_other
        ? this.professionalDetails.league_other
        : '',
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
      contact_person: this.professionalDetails.contact_person,
      trophies: this.professionalDetails.trophies,

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
    if (this.member_type == 'academy' || this.member_type === 'club') {
      let clubAcadCommonControls = [
        {
          name: 'contact_person',
          abstractControl: this._formBuilder.array([], [Validators.required])
        },
        {
          name: 'trophies',
          abstractControl: this._formBuilder.array([])
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
          name: 'type',
          abstractControl: this._formBuilder.control('', [Validators.required])
        }
      ];
      this.formControlAdder(
        this.professionalDetailsForm,
        clubAcadCommonControls
      );
    }
  }

  createForm() {
    if (this.member_type === 'player') {
      this.professionalDetailsForm = this._formBuilder.group({
        position: this._formBuilder.array([]),
        strong_foot: ['', []],
        associated_club_academy: ['', []],
        weak_foot: ['', []],
        head_coach_name: [''],
        head_coach_phone: [''],
        head_coach_email: [''],
        former_club_academy: ['', []]
      });
    } else if (this.member_type === 'club') {
      this.professionalDetailsForm = this._formBuilder.group({
        top_signings: this._formBuilder.array([], [])
      });
    } else if (this.member_type === 'academy') {
      this.professionalDetailsForm = this._formBuilder.group({
        top_players: this._formBuilder.array([], [])
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
        // Validators.required,//temp
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/)
      ],
      head_coach_email: [Validators.email],
      head_coach_name: [
        // Validators.required,//temp
        Validators.pattern(/^[a-zA-Z0-9\&\-\(\) ]+$/)
      ]
    };
    this.setControlValidation(this.professionalDetailsForm, headCoachControl);

    this.professionalDetailsForm
      .get('associated_club_academy')
      .valueChanges.subscribe(associated_club_academy => {
        if (associated_club_academy === 'yes') {
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
        } else if (associated_club_academy === 'no') {
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
    if (this.member_type === 'player') {
      this.setPlayerValidators();
    } else if (this.member_type === 'club' || this.member_type === 'academy') {
      const trophies = this.professionalDetailsForm.get('trophies');
      const leagueOther = this.professionalDetailsForm.get('league_other');

      if (this.member_type === 'academy') {
        trophies.setValidators([Validators.required]);
      }

      this.professionalDetailsForm
        .get('league')
        .valueChanges.subscribe(league => {
          if (league !== 'Other') {
            leagueOther.setValue('');
          }
        });

      associationOther.updateValueAndValidity();
      leagueOther.updateValueAndValidity();
      trophies.updateValueAndValidity();
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
    } else if (this.member_type === 'club' || this.member_type === 'academy') {
      this.setRequestDataObject(requestData, 'contact_person');
      this.setRequestDataObject(requestData, 'trophies');

      if (this.member_type === 'club')
        this.setRequestDataObject(requestData, 'top_signings');

      if (this.member_type === 'academy')
        this.setRequestDataObject(requestData, 'top_players');
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
