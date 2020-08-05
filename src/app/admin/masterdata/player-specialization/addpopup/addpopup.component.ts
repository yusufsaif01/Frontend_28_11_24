import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '@app/admin/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { untilDestroyed } from '@app/core';
@Component({
  selector: 'app-addpopup',
  templateUrl: './addpopup.component.html',
  styleUrls: ['./addpopup.component.scss']
})
export class AddpopupComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {}

  ngOnInit() {}

  addSpecialization() {
    if (this.data.specialization === 'ability') {
      this.addAbility();
    } else if (this.data.specialization === 'attribute') {
      this.addAttribute();
    }
  }

  addAbility() {
    this.adminService
      .addAbility(this.addForm.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('refresh');

          this.toastrService.success(`Success`, 'Ability added successfully');
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }

  addAttribute() {
    this.adminService
      .addAttribute({ ...this.addForm.value, ability_id: this.data.ability_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('refresh');

          this.toastrService.success(`Success`, 'Attribute added successfully');
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]]
    });
  }
}
