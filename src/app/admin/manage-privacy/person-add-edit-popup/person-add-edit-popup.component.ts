import { untilDestroyed } from '@app/core';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManagePrivacyService } from '../manage-privacy-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-person-add-edit-popup',
  templateUrl: './person-add-edit-popup.component.html',
  styleUrls: ['./person-add-edit-popup.component.scss']
})
export class PersonAddEditPopupComponent implements OnInit, OnDestroy {
  options: any = {};
  whiteListUserForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<PersonAddEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private managePrivacyService: ManagePrivacyService,
    private toastrService: ToastrService
  ) {
    this.whiteListUserForm = this.formBuilder.group({
      name: ['', [Validators.pattern(/^[a-zA-Z0-9\&\@\(\)\#\-\% ]+$/)]],
      phone: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.options = this.data.options;
    this.patchValues();
  }

  patchValues() {
    if (this.data.data) {
      this.whiteListUserForm.patchValue(this.data.data);
    }
  }

  ngOnDestroy() {}

  editAddFormValue() {
    if (this.whiteListUserForm.invalid) {
      return;
    }
    let requestData = this.whiteListUserForm.value;
    if (this.data.data) {
      this.updateData(requestData);
    } else {
      this.addData(requestData);
    }
  }

  updateData(requestData: any) {
    this.managePrivacyService
      .updateWhiteListUser(this.data.data.id, requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('refresh');
          this.toastrService.success(`Success`, 'Person updated successfully');
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }

  addData(requestData: any) {
    this.managePrivacyService
      .whiteListUser(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('refresh');
          this.toastrService.success(`Success`, 'Person added successfully');
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }
}
