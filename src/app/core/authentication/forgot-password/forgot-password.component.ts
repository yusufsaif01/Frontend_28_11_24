import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPasswordForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService
  ) {
    this.createForm();
  }
  ngOnDestroy() {}

  ngOnInit() {}

  forgotPassword() {
    this._authenticationService
      .forgotPassword(this.forgotPasswordForm.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          const userId = response.data.userId;
          localStorage.setItem('userId', userId);
          localStorage.setItem('data', 'data');

          this._toastrService.success('Success', 'Reset link sent');
          this.router.navigate(
            [
              this.route.snapshot.queryParams.redirect ||
                '/OtpForForgotPasswordComponent'
            ],
            { replaceUrl: true }
          );
        },
        error => {
          this._toastrService.error(`${error.error.message}`, 'Failed');
        }
      );
  }

  createForm() {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.email]],
      mobile_number: ['']
    });
  }
}
