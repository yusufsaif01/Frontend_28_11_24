import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgetPasswordForm: FormGroup;
  linkSent: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService
  ) {
    this.createForm();
  }
  ngOnDestroy() {}

  ngOnInit() {}

  forgetPassword() {
    this._authenticationService
      .forgetPassword(this.forgetPasswordForm.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.linkSent = true;
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
