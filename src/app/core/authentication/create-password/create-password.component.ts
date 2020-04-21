import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { matchingPassword } from '@app/shared/validators/matchingPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {
  createPasswordForm: FormGroup;
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

  ngOnInit() {
    console.log('token', this.token);
    this._authenticationService.emailVerification(this.token).subscribe(
      response => {
        if (response.status === 'success') {
          this.isLinkExpired = true;
          this._toastrService.success(
            'Successful',
            'Email verified successfully'
          );
        }
        console.log('data', response);
      },
      error => {
        if (error.error.code === 'LINK_EXPIRED')
          this._router.navigate(['/link-expired']);

        console.log('error', error);
      }
    );
  }

  createPassword() {
    this._authenticationService
      .createPassword(this.createPasswordForm.value, this.token)
      .subscribe(
        response => {
          console.log('data', response);
          this._toastrService.success('Successful', 'Password Creation');
          this._router.navigate(['/login']);
        },
        error => {
          console.log('error', error);
          this._toastrService.error('Failed', 'Password Creation');
        }
      );
  }

  createForm() {
    this.createPasswordForm = this._formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: matchingPassword
      }
    );
  }
}
