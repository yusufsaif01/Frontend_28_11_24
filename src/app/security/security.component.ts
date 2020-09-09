import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, CredentialsService } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit, OnDestroy {
  accessTokenRequestForm: FormGroup;
  accessTokenVerificationForm: FormGroup;
  showAccessTokenVerificationForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _credentialsService: CredentialsService,
    private _toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createAccessTokenRequestForm();
  }
  ngOnDestroy() {}

  ngOnInit() {}

  accessTokenRequest() {
    this._toastrService.info('We are verifying your email', 'Please wait');

    this._authenticationService
      .accessTokenRequest(this.accessTokenRequestForm.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success('Success', 'OTP sent');
          this.showAccessTokenVerificationForm = true;
          this.createAccessTokenVerificationForm();
        },
        error => {
          if (error.status === 404)
            this._toastrService.error(
              'Error',
              'You are not an authorized user. Please contact admin for help'
            );
          else this._toastrService.error('Error', `${error.error.message}`);
        }
      );
  }

  accessTokenVerification() {
    this._authenticationService
      .accessTokenVerification(this.accessTokenVerificationForm.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success('Success', 'OTP verified');
          this._credentialsService.setAccessToken(
            response.data.access_token,
            true
          );
          this.router.navigate(['/home']);
        },
        error => {
          this._toastrService.error('Failed', `${error.error.message}`);
        }
      );
  }

  createAccessTokenRequestForm() {
    this.accessTokenRequestForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  createAccessTokenVerificationForm() {
    this.accessTokenVerificationForm = this._formBuilder.group({
      email: [
        this.accessTokenRequestForm.controls.email.value,
        [Validators.required, Validators.email]
      ],
      otp: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }
}
