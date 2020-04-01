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

  playerRegisterationForm: FormGroup;
  clubRegisterationForm: FormGroup;
  academyRegisterationForm: FormGroup;

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
  }
  playerRegister() {
    let form_data = this.playerRegisterationForm.value;
    form_data.member_type = this.activeForm;
    console.log('player form_data', form_data);
    const register = this._authenticationService.register(form_data);
    register.subscribe(
      credentials => {
        console.log('CRedentials', credentials);
        this._toastrService.success('Successful', 'Registered');
        this.playerRegisterationForm.reset()
      },
      error => {
        console.log('ERror', error);
        this._toastrService.error(`${error.error.message}`, 'Failed');
      }
    );
  }
  clubRegister() {
    let form_data = this.clubRegisterationForm.value;
    form_data.member_type = this.activeForm;
    console.log('club form_data', form_data);
    const register = this._authenticationService.register(form_data);
    register.subscribe(
      credentials => {
        console.log('CRedentials', credentials);
        this._toastrService.success('Successful', 'Registered');
        this.clubRegisterationForm.reset()
      },
      error => {
        console.log('ERror', error);
        this._toastrService.error(`${error.error.message}`, 'Failed');
      }
    );
  }
  academyRegister() {
    let form_data = this.academyRegisterationForm.value;
    form_data.member_type = this.activeForm;
    console.log('academy form_data', form_data);
    const register = this._authenticationService.register(form_data);
    register.subscribe(
      credentials => {
        console.log('CRedentials', credentials);
        this._toastrService.success('Successful', 'Registered');
        this.academyRegisterationForm.reset()
      },
      error => {
        console.log('ERror', error);
        this._toastrService.error(`${error.error.message}`, 'Failed');
      }
    );
  }

  isFocused(form: FormGroup, field: string) {
    const { invalid, touched } = form.get(field);
    return invalid && touched;
  }

  isRequired(form: FormGroup, field: string) {
    const { required } = form.get(field).errors;
    return required;
  }

  private createForm() {
    this.playerRegisterationForm = this._formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13)
        ]
      ],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });

    this.clubRegisterationForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13)
        ]
      ],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
    this.academyRegisterationForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13)
        ]
      ],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }
}
