import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  activeForm: string = 'player';

  playerRegistrationForm: FormGroup;
  clubRegistrationForm: FormGroup;
  academyRegistrationForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  toggleForm(formName: string) {
    this.activeForm = formName;
    this.resetFormFields();
  }

  resetFormFields() {
    this.clubRegistrationForm.reset();
    this.playerRegistrationForm.reset();
    this.academyRegistrationForm.reset();
    this.createForm();
  }

  playerRegister() {
    let form_data = this.playerRegistrationForm.value;
    form_data.member_type = this.activeForm;
    console.log('player form_data', form_data);
    const register = this._authenticationService.register(form_data);
    register.subscribe(
      credentials => {
        console.log('CRedentials', credentials);
        this._toastrService.success('Successful', 'Registered');
        this.playerRegistrationForm.reset();
      },
      error => {
        console.log('ERror', error);
        this._toastrService.error(`${error.error.message}`, 'Failed');
      }
    );
  }
  clubRegister() {
    let form_data = this.clubRegistrationForm.value;
    form_data.member_type = this.activeForm;
    console.log('club form_data', form_data);
    const register = this._authenticationService.register(form_data);
    register.subscribe(
      credentials => {
        console.log('CRedentials', credentials);
        this._toastrService.success('Successful', 'Registered');
        this.clubRegistrationForm.reset();
      },
      error => {
        console.log('ERror', error);
        this._toastrService.error(`${error.error.message}`, 'Failed');
      }
    );
  }
  academyRegister() {
    let form_data = this.academyRegistrationForm.value;
    form_data.member_type = this.activeForm;
    console.log('academy form_data', form_data);
    const register = this._authenticationService.register(form_data);
    register.subscribe(
      credentials => {
        console.log('CRedentials', credentials);
        this._toastrService.success('Successful', 'Registered');
        this.academyRegistrationForm.reset();
      },
      error => {
        console.log('ERror', error);
        this._toastrService.error(`${error.error.message}`, 'Failed');
      }
    );
  }

  private createForm() {
    this.playerRegistrationForm = this._formBuilder.group({
      first_name: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(/^.*[a-zA-Z]+[0-9 ]*$/)
        ]
      ],
      last_name: [
        '',
        [Validators.required, Validators.pattern(/^.*[a-zA-Z]+[0-9 ]*$/)]
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
      country: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });

    this.clubRegistrationForm = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(/^.*[a-zA-Z]+[0-9 ]*$/)
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
      country: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
    this.academyRegistrationForm = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(/^.*[a-zA-Z]+[0-9 ]*$/)
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
      country: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }
}
