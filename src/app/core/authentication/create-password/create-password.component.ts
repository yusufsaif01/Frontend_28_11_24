import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { matchingPassword } from '@app/shared/validators/matchingPassword';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit, OnDestroy {
  createPasswordForm: FormGroup;
  token: string;
  isLinkExpired: boolean = false;
  tooltip: string =
    'Please provide at least 1 special character, 1 number and 1 alphabet';

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

  ngOnDestroy() {}

  ngOnInit() {
    const obj = { email: '' };
    const email = localStorage.getItem('email');
    const isEmail = localStorage.getItem('isEmail');
    obj.email = email;

    this._authenticationService
      .emailVerification(obj)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          console.log('response recived is');
          console.log(response);
          if (response.status === 'success') {
            console.log('inside response success ===>');
            this.isLinkExpired = true;
            this._toastrService.success(
              'Success',
              'Email verified successfully'
            );
          }
        },
        error => {
          // if (error.error.code === 'LINK_EXPIRED' || error.error.code === 'INVALID_TOKEN')
          this._router.navigate(['/link-expired']);
        }
      );
  }

  createPassword() {
    const email = localStorage.getItem('email');
    this._authenticationService
      .createPassword(this.createPasswordForm.value, email)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success('Success', 'Password creation');
          this._router.navigate(['/login']);
        },
        error => {
          this._toastrService.error('failed', 'Password creation');
        }
      );
  }

  createForm() {
    this.createPasswordForm = this._formBuilder.group(
      {
        password: [
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
        confirmPassword: [
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
