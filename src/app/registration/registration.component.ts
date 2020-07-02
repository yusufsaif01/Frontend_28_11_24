import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '@app/shared/static-data/static-data';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  activeForm: string = 'player';
  tooltip: string = '';
  typeArray: any[] = [];
  playerType: any[] = Constants.PLAYER_TYPE;
  clubAcademyType: any[] = Constants.CLUB_ACADEMY_TYPE;
  registrationForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService
  ) {
    this.createForm();
  }

  ngOnDestroy() {}

  ngOnInit() {
    this.typeArray = this.playerType;
    this.setPlayerValidators();
  }

  clearValidators() {
    this.registrationForm.controls.name.clearValidators();
    this.registrationForm.controls.name.updateValueAndValidity();
    this.registrationForm.controls.first_name.clearValidators();
    this.registrationForm.controls.first_name.updateValueAndValidity();
    this.registrationForm.controls.last_name.clearValidators();
    this.registrationForm.controls.last_name.updateValueAndValidity();
  }

  setPlayerValidators() {
    this.clearValidators();
    this.registrationForm.controls.first_name.setValidators([
      Validators.required,
      Validators.maxLength(25),
      Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
    ]);
    this.registrationForm.controls.last_name.setValidators([
      Validators.required,
      Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
    ]);
    this.registrationForm.controls.type.patchValue('');
  }

  setClubAcademyValidators() {
    this.clearValidators();
    this.registrationForm.controls.name.setValidators([
      Validators.required,
      Validators.maxLength(25),
      Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
    ]);
    this.registrationForm.controls.type.patchValue('');
  }

  toggleForm(formName: string) {
    this.activeForm = formName;
    this.resetFormFields();

    if (this.activeForm === 'club' || this.activeForm === 'academy') {
      this.setClubAcademyValidators();
      this.typeArray = this.clubAcademyType;
    }
    if (this.activeForm === 'player') {
      this.setPlayerValidators();
      this.typeArray = this.playerType;
    }
  }

  resetFormFields() {
    this.registrationForm.reset();
    this.tooltip = '';
    if (this.activeForm === 'club' || this.activeForm === 'academy') {
      this.setClubAcademyValidators();
    }
    if (this.activeForm === 'player') {
      this.setPlayerValidators();
    }
  }

  register() {
    let form_data = this.registrationForm.value;
    form_data.member_type = this.activeForm;
    if (this.activeForm === 'club' || this.activeForm === 'academy') {
      delete form_data.first_name;
      delete form_data.last_name;
    }
    if (this.activeForm === 'player') {
      delete form_data.name;
    }
    for (const key in form_data) {
      form_data[key] = form_data[key].trim();
    }
    this._authenticationService
      .register(form_data)
      .pipe(untilDestroyed(this))
      .subscribe(
        credentials => {
          this._toastrService.success('Successful', 'Registered');
          this.resetFormFields();
        },
        error => {
          this._toastrService.error(`${error.error.message}`, 'Failed');
        }
      );
  }

  createForm() {
    this.registrationForm = this._formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      name: [''],
      type: ['', [Validators.required]]
    });
  }

  onSelectType(typeValue: string) {
    switch (typeValue) {
      case '':
        this.tooltip = '';
        break;
      case 'grassroot':
        this.tooltip = 'Players between 6-12 years.';
        break;
      case 'amateur':
        this.tooltip =
          'Players who have never received any remuneration nor they currently have an employment contract with a club/ academy.';
        break;
      case 'professional':
        this.tooltip =
          'Players who are currently employed by club/ academy and have an official written contract.';
        break;
      case 'Residential':
        this.tooltip =
          'Type that consist of residential rooms, bathrooms, toilets, dining room, kitchen, leisure/recreation room and schooling for players.';
        break;
      case 'Non-Residential':
        this.tooltip =
          'Type that does not consist of residential rooms, bathrooms, toilets, dining room, kitchen, leisure/recreation room and schooling for players.';
        break;
    }
  }
}
