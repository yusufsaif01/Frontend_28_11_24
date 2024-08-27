import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '@app/shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { verificationTypeService } from './verificationType.Service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, untilDestroyed } from '@app/core';
@Component({
  selector: 'app-verification-type',
  templateUrl: './verification-type.component.html',
  styleUrls: ['./verification-type.component.scss']
})
export class VerificationTypeComponent implements OnInit, OnDestroy {
  otpTypeForm: FormGroup;
  error: string | undefined;
  userId: string;
  email: string;
  name: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _verificationTypeService: verificationTypeService,
    public dialog: MatDialog,
    private _toastrService: ToastrService,
    private _sharedService: SharedService
  ) {
    this.createForm();
  }

  ngOnInit() {
    console.log('in component');
    this.email = localStorage.getItem('email');
    console.log('email is');
    console.log(this.email);
  }

  ngOnDestroy() {}

  // otpVerificationType()
  // {
  //   console.log('inside otpVerifyType is=>');
  //   let requestData = this.otpTypeForm.value;
  //   console.log("request data for verification type",requestData)
  //   if(requestData.email !=="")
  //   {
  //     console.log("email is selected")
  //     this.router.navigate(
  //       [this.route.snapshot.queryParams.redirect || '/otp-verification'],
  //       { replaceUrl: true }
  //     );
  //   }
  //   else{
  //     console.log("Phone Number is selected")
  //     this.router.navigate(
  //       [this.route.snapshot.queryParams.redirect || '/otp-phone'],
  //       { replaceUrl: true }
  //     );
  //   }

  // }

  otpVerificationType() {
    console.log('inside otpVerify is=>');
    let requestData = this.otpTypeForm.value;
    console.log('requestData for type select', requestData);

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
          this._toastrService.error(`Error`, 'Otp Not matched');
          this.error = error;
        }
      );
  }

  createForm() {
    const email = localStorage.getItem('email');
    this.otpTypeForm = this._formBuilder.group({
      email_select: [''],
      email: [email],
      phone_select: ['']
    });
  }
}
