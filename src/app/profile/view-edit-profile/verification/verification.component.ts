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
    this.otpVerifyForm.controls.email.patchValue(this.email);
    this.otpVerifyForm.controls.userId.patchValue(this.userId);
    this.otpVerifyForm.controls.mobile_number.patchValue(this.mobile_number);
  }

  otpVerify() {
    console.log('inside otpVerify is=>');
    let requestData = this.otpVerifyForm.value;
    this.otpVerifyForm.controls.email.setValue('ravi');
    console.log('request send from frontend', requestData);
    this._editProfileService
      .verifyOtp(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          console.log('response in api hits');
          console.log(response);
          if (response.data) {
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