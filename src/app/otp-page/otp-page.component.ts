import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '@app/shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtpService } from './otp.Service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, untilDestroyed } from '@app/core';
@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.scss']
})
export class OtpPageComponent implements OnInit, OnDestroy {
  otpVerifyForm: FormGroup;
  error: string | undefined;
  userId: string;
  email: string;
  editMode: boolean = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _otpService: OtpService,
    public dialog: MatDialog,
    private _toastrService: ToastrService,
    private _sharedService: SharedService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    console.log('email is');
    console.log(this.email);
    this.startTime();
    // this.otpVerify();
  }

  ngOnDestroy() {}

  interval: any;

  startTime() {
    this.interval = setTimeout(() => {
      this.editMode = false;
    }, 20000);
  }

  reSendOtp() {
    console.log('inside otpVerify is=>');
    let requestData = this.otpVerifyForm.value;
    this._otpService
      .reSendOtp(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(response => {
        console.log('response in api hits');
        console.log(response);
        if (response.data) {
          this._toastrService.success(`Success`, 'Otp Send successfully');
          this.editMode = true;
        } else {
          console.log('inside otpverify ===========>');
          this._toastrService.error(`Error`, 'Otp Not matched');
        }
      });
  }
  otpVerify() {
    console.log('inside otpVerify is=>');
    let requestData = this.otpVerifyForm.value;
    this._otpService
      .verifyOtp(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          console.log('response in api hits');
          console.log(response);
          if (response.data) {
            this._toastrService.success(`Success`, 'Otp verified successfully');
            this.router.navigate(
              [this.route.snapshot.queryParams.redirect || '/create-password'],
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
    this.otpVerifyForm = this._formBuilder.group({
      email: [email],
      otp: [
        '',
        [Validators.required, Validators.minLength(0), Validators.maxLength(4)]
      ],
      name: ['']
    });
  }
}
