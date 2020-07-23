import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { matchingPassword } from '@app/shared/validators/matchingPassword';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordForm: FormGroup;
  tooltip: string =
    'Please provide at least 1 special character, 1 number and 1 alphabet';

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService
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
              'success',
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
        new_password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(
              /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\\\|\:\;\'\"\,\.\<\>\/\?])/
            )
          ]
        ],
        confirm_password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(
              /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]\\\|\:\;\'\"\,\.\<\>\/\?])/
            )
          ]
        ]
      },
      {
        validator: matchingPassword
      }
    );
  }
}
