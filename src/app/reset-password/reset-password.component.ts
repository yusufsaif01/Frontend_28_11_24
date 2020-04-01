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

  isFocused(form: FormGroup, field: string) {
    const { invalid, touched } = form.get(field);
    return invalid && touched;
  }

  isRequired(form: FormGroup, field: string) {
    const { required } = form.get(field).errors;
    return required;
  }

  resetPassword() {
    this._authenticationService
      .resetPassword(this.resetPasswordForm.value, this.token)
      .subscribe(
        response => {
          console.log('data', response);
          this._toastrService.success('Successful', 'Password Reset');
          this._router.navigate(['/login']);
        },
        error => {
          console.log('error', error);
          this._toastrService.error(`${error.error.message}`, 'Password Reset Failed');
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
