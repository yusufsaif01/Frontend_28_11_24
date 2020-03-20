import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  token: any;
  profile: any;
  userProfileFormGroup: any;
  submitted: boolean = false;

  constructor(private userProfileService: UserProfileService, private router: Router) {
    this.token = JSON.parse(localStorage.getItem('credentials')).data.token || '';
  }

  ngOnInit() {
    this.userProfileFormGroup = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, , Validators.pattern('[^ @]*@[^ @]*')])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      location: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required]))
    });

    this.userProfileService.getUserProfile({ token: `Bearer ${this.token}` }).subscribe(
      success => {
        if (success['data']) {
          this.userProfileFormGroup.patchValue(success['data']);
          this.profile = success;
        }
      },
      error => {}
    );
  }

  updateUserProfile(data: any) {
    if (this.userProfileFormGroup.invalid) {
      console.log(this.userProfileFormGroup.invalid);
      return;
    }

    this.userProfileService.updateProfile({ token: `Bearer ${this.token}`, ...data }).subscribe(
      (success: any) => {
        this.router.navigate(['../user-profile']);
      },
      error => {}
    );
  }
}
