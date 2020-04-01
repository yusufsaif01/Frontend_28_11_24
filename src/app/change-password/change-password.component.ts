import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  isFocused(form: FormGroup, field: string) {
    const { invalid, touched } = form.get(field);
    return invalid && touched;
  }

  isRequired(form: FormGroup, field: string) {
    const { required } = form.get(field).errors;
    return required;
  }

  changePassword() {
    console.log(this.changePasswordForm.value);
    const {
      old_password,
      new_password,
      confirm_password
    } = this.changePasswordForm.value;
    if (new_password === confirm_password) {
      this._authenticationService
        .changePassword(this.changePasswordForm.value)
        .subscribe(
          response => {
            console.log('data', response);
          },
          error => {
            console.log('error', error);
          }
        );
    } else {
      console.log('Password not match');
    }
  }

  createForm() {
    this.changePasswordForm = this._formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }
}
