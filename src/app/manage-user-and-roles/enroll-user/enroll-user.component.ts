import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user-service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enroll-user',
  templateUrl: './enroll-user.component.html',
  styleUrls: ['./enroll-user.component.scss']
})
export class EnrollUserComponent implements OnInit, OnDestroy {
  enrollForm: FormGroup;
  submitted: boolean = false;
  isLoading = false;
  updateMode: boolean = false;
  constructor(
    private fromBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.enrollForm = this.fromBuilder.group({
      user_id: ['', Validators.required],
      name: ['', Validators.required],
      vendor_id: [''],
      email: ['', Validators.email],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      warehouse: ['', Validators.required],
      dob: ['', Validators.required],
      doj: ['', Validators.required],
      location: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required]
    });
  }
  ngOnDestroy(): void {}

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParams.id);
    if (this.activatedRoute.snapshot.queryParams.id) {
      this.updateMode = true;
      this.getUserData(this.activatedRoute.snapshot.queryParams.id);
    }
  }

  submitToDb() {
    if (this.updateMode) {
      this.updateUser();
    } else {
      this.addNewUser();
    }
  }

  addNewUser() {
    this.submitted = true;
    if (this.enrollForm.invalid) {
      return;
    }
    let resp = this.enrollForm.value;
    console.log(resp);
    this.userService
      .saveUser(resp)
      .pipe(
        finalize(() => {
          this.enrollForm.markAsPristine();
          this.submitted = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (success: any) => {
          console.log(success, 'SUCCESS');
          this.toastr.success('Success', success.message);
          this.router.navigateByUrl('/users/list');
        },
        error => {
          console.log(error);
          this.toastr.error('Error', error.error.message);
        }
      );
  }
  updateUser() {
    this.submitted = true;
    if (this.enrollForm.invalid) {
      return;
    }
    let resp = this.enrollForm.value;
    console.log(resp);
    this.userService
      .updateUser(this.activatedRoute.snapshot.queryParams.id, resp)
      .pipe(
        finalize(() => {
          this.enrollForm.markAsPristine();
          this.submitted = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (success: any) => {
          console.log(success, 'SUCCESS');
          this.toastr.success('Success', success.message);
          this.updateMode = false;
          this.router.navigateByUrl('/users/list');
        },
        error => {
          console.log(error);
          this.toastr.error('Error', error.error.message);
        }
      );
  }
  getUserData(id: any) {
    this.userService.getUserById(id).subscribe(
      (success: any) => {
        console.log(success);
        this.enrollForm.patchValue(success.data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
