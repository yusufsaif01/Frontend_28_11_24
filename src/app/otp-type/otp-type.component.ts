import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '@app/shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { otpTypeService } from './otp-type.Service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, untilDestroyed } from '@app/core';
@Component({
  selector: 'app-otp-type',
  templateUrl: './otp-type.component.html',
  styleUrls: ['./otp-type.component.scss']
})
export class OtpTypeComponent implements OnInit, OnDestroy {
  otpTypeForm: FormGroup;
  error: string | undefined;
  userId: string;
  email: string;
  mobile_number: string;
  is_email_select: string;
  is_mobile_select: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _verificationTypeService: otpTypeService,
    public dialog: MatDialog,
    private _toastrService: ToastrService,
    private _sharedService: SharedService
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log('in component');
    this.email = localStorage.getItem('email');
    this.mobile_number = localStorage.getItem('mobile_number');
    console.log('email is');
    console.log(this.email);
  }

  ngOnDestroy() {}

  email_select(email_select) {
    this.is_email_select = email_select;
  }
  phone_select(phone_select) {
    this.is_mobile_select = phone_select;
  }
  otpVerificationType() {
    console.log('inside otpVerify is=>');
    let requestData = this.otpTypeForm.value;

    console.log('requestData for type select', requestData);
    if (this.is_email_select) {
      requestData.email_select = 'email_select';
    }
    if (this.is_mobile_select) {
      requestData.phone_select = 'phone_select';
    }
    console.log('After requestData for select', requestData);
    this._verificationTypeService
      .verificationType(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          console.log('response in api hits');
          console.log(response);
          if (response) {
            this._toastrService.success(`Success`, 'Otp Send successfully');
            this.router.navigate(
              [this.route.snapshot.queryParams.redirect || '/otp-verification'],
              { replaceUrl: true }
            );
          }
        },
        error => {
          console.log('inside otpverify ===========>');
          this._toastrService.error(
            `Error`,
            'Please Select Verification Method'
          );
          this.error = error;
        }
      );
  }

  createForm() {
    const email = localStorage.getItem('email');
    const email_select = localStorage.getItem('email_select');
    const mobile_number = localStorage.getItem('mobile_number');
    console.log();
    this.otpTypeForm = this._formBuilder.group({
      email_select: [email_select],
      email: [email],
      mobile_number: [mobile_number],
      phone_select: []
    });
  }
}
