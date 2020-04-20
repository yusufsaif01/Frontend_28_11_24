import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string;
  isLinkExpired: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
    this.createForm();
    this._route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnInit() {}

  resetPassword() {
    this._authenticationService
      .resetPassword(this.resetPasswordForm.value, this.token)
      .subscribe(
        response => {
          if (response.status === 'success') {
            this.isLinkExpired = true;
            this._toastrService.success('Successful', 'Password Reset');
            this._authenticationService.logout();
          }
          console.log('data', response);
        },
        error => {
          if (error.error.code === 'UNAUTHORIZED')
            this._router.navigate(['/link-expired']);

          console.log('error', error);
        }
      );
  }

  createForm() {
    this.resetPasswordForm = this._formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
}
