import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '@app/shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtpService } from './otp.Service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.scss']
})
export class OtpPageComponent implements OnInit, OnDestroy {
  otpVerifyForm: FormGroup;
  userId: string;
  email: string;
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
    // this.otpVerify();
  }

  ngOnDestroy() {}

  otpVerify() {
    let requestData = this.otpVerifyForm.value;
    this._otpService
      .verifyOtp(requestData)
      // .pipe(untilDestroyed(this))
      .subscribe(response => {
        if (response.data) {
          this._toastrService.success(`Success`, 'Otp verified successfully');
          this.router.navigate(
            [this.route.snapshot.queryParams.redirect || '/create-password'],
            { replaceUrl: true }
          );
        } else {
          this._toastrService.error(`Error`, 'Otp Not matched');
        }
        console.log('response in api hits');
        console.log(response);
      });
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
