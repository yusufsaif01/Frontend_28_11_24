import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, untilDestroyed } from '@app/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { matchingPassword } from '@app/shared/validators/matchingPassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {
    this.createForm();
  }

  ngOnDestroy() {}

  ngOnInit() {}

  changePassword() {
    const {
      old_password,
      new_password,
      confirm_password
    } = this.changePasswordForm.value;
    if (new_password === confirm_password) {
      this._authenticationService
        .changePassword(this.changePasswordForm.value)
        .pipe(untilDestroyed(this))
        .subscribe(
          response => {
            this._toastrService.success(
              'Successful',
              'Password updated successfully. Please login again with your new password.'
            );
            this._authenticationService.logout();
          },
          error => {
            this._toastrService.error(
              `${error.error.message}`,
              'An error occured while updating the password'
            );
          }
        );
    } else {
    }
  }

  createForm() {
    this.changePasswordForm = this._formBuilder.group(
      {
        old_password: ['', [Validators.required]],
        new_password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]]
      },
      {
        validator: matchingPassword
      }
    );
  }
}
