import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  forgetPassword() {
    this._authenticationService
      .forgetPassword(this.forgetPasswordForm.value)
      .subscribe(
        response => {
          this._toastrService.success('Successful', 'Reset Link Sent');
        },
        error => {
          this._toastrService.error(`${error.error.message}`, 'Failed');
        }
      );
  }

  createForm() {
    this.forgetPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
}
