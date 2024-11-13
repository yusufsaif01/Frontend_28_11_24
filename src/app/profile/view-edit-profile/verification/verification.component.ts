import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { requiredFileAvatar } from '@app/shared/validators/requiredFileAvatar';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ViewEditProfileService } from '../view-edit-profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  otpVerifyForm: FormGroup;
  email: string = '';
  name: string = '';
  userId: string = '';
  mobile_number = '';
  error: string | undefined;
  editMode: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<VerificationComponent>,
    private formBuilder: FormBuilder,
    private _editProfileService: ViewEditProfileService,
    private router: Router,
    private route: ActivatedRoute,

    @Inject(MAT_DIALOG_DATA) private data: any,
    private imageCompress: NgxImageCompressService,
    private loaderService: NgxSpinnerService,
    private _toastrService: ToastrService
  ) {
    this.createForm();
    console.log('this create form data is', this.data);
    if (this.data) {
      this.email = data.email;
      this.name = data.name;
      this.userId = data.userId;
      this.mobile_number = data.mobile_number;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // this.otpVerifyForm.controls.email.patchValue(this.email);
    // this.otpVerifyForm.controls.userId.patchValue(this.userId);
    // this.otpVerifyForm.controls.mobile_number.patchValue(this.mobile_number);

    this.otpVerifyForm.patchValue({
      email: this.email,
      userId: this.userId,
      mobile_number: this.mobile_number
    });
    this.startTime();
  }

  interval: any;

  startTime() {
    this.interval = setTimeout(() => {
      this.editMode = false;
    }, 20000);
  }

  resendOtp(id: string, email: string, mobile: string) {
    console.log('id and email recived are', id, email, mobile);
    let dataToSend = email;
    if (email === undefined) {
      dataToSend = mobile;
    }
    this._editProfileService
      .verifyEmail(id, dataToSend)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          console.log('response in api hits');
          console.log(response);
          if (response.data) {
            this._toastrService.success(`Success`, 'Otp Send successfully');
          }
        },
        error => {
          console.log('inside otpverify ===========>');
          this._toastrService.error(`Error`, 'Otp Not matched');
          // this.error = error;
        }
      );
  }

  verifyOtp() {
    console.log('inside verifyOtp is=>');
    let requestData = this.otpVerifyForm.value;

    console.log('verify otp data is', requestData);
    console.log(this.email, this.name, this.userId, this.mobile_number);
    this._editProfileService
      .verifyOtp(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          console.log('response in api hits');
          console.log(response);
          if (response.data) {
            this.otpVerifyForm.reset();
            this._toastrService.success(`Success`, 'Otp verified successfully');
            this.dialogRef.close('success');
            this.router.navigate(
              [this.route.snapshot.queryParams.redirect || '/member/profile'],
              { replaceUrl: true }
            );
          }
        },
        error => {
          this._toastrService.error(`Error`, 'Otp Not matched');
          this.error = error;
        }
      );
  }

  createForm() {
    this.otpVerifyForm = this.formBuilder.group({
      otp: [''],
      email: [''],
      name: [''],
      userId: [''],
      mobile_number: ['']
    });
  }

  ngOnDestroy() {}
}
