import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  activeForm: string = 'player';
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
    this.setDefaultValidators();
  }
  setDefaultValidators() {
    this.registrationForm.controls.name.clearValidators();
    this.registrationForm.controls.first_name.setValidators([
      Validators.required,
      Validators.maxLength(25),
      Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
    ]);
    this.registrationForm.controls.last_name.setValidators([
      Validators.required,
      Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
    ]);
  }

  toggleForm(formName: string) {
    this.activeForm = formName;
    this.resetFormFields();
    if (this.activeForm === 'club' || this.activeForm === 'academy') {
      this.registrationForm.controls.first_name.clearValidators();
      this.registrationForm.controls.last_name.clearValidators();
      this.registrationForm.controls.name.setValidators([
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
      ]);
    }
    if (this.activeForm === 'player') {
      this.setDefaultValidators();
    }
  }

  resetFormFields() {
    this.registrationForm.reset();
    this.createForm();
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
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
        ]
      ],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }
}
