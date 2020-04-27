import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '@app/admin/service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-addpopup',
  templateUrl: './addpopup.component.html',
  styleUrls: ['./addpopup.component.scss']
})
export class AddpopupComponent implements OnInit {
  addAbilityForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddpopupComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {}
  addAbility() {
    this.adminService.addAbility(this.addAbilityForm.value).subscribe(
      response => {
        this.dialogRef.close('refresh');

        this.toastrService.success(
          `${response.message}`,
          'Ability Added Successfully'
        );
      },
      error => {
        this.toastrService.error(`${error.error.message}`, 'Error');
      }
    );
  }

  createForm() {
    this.addAbilityForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+|[0-9 ]?[a-zA-Z ]+[0-9 ]?$/)
        ]
      ]
    });
  }
}
