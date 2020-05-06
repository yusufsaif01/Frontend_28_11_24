import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '@app/admin/service/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-addpopup',
  templateUrl: './addpopup.component.html',
  styleUrls: ['./addpopup.component.scss']
})
export class AddpopupComponent implements OnInit {
  addForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddpopupComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA)
    public data: { specialization: string; ability_id?: string }
  ) {
    this.createForm();
  }

  ngOnInit() {}
  addSpecialization() {
    if (this.data.specialization === 'ability') {
      this.addAbility();
    } else if (this.data.specialization === 'parameter') {
      this.addParameter();
    }
  }
  addAbility() {
    this.adminService.addAbility(this.addForm.value).subscribe(
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
  addParameter() {
    this.adminService
      .addParameter({ ...this.addForm.value, ability_id: this.data.ability_id })
      .subscribe(
        response => {
          this.dialogRef.close('refresh');

          this.toastrService.success(
            `${response.message}`,
            'Parameter Added Successfully'
          );
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }
  createForm() {
    this.addForm = this.formBuilder.group({
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
