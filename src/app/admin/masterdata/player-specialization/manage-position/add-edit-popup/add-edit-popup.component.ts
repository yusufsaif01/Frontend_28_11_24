import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PositionService } from '../manage-position-service';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-add-edit-popup',
  templateUrl: './add-edit-popup.component.html',
  styleUrls: ['./add-edit-popup.component.scss']
})
export class AddEditPopupComponent implements OnInit, OnDestroy {
  options: any = {};
  abilities: any[] = [];
  selectedAbilities: any[] = [];
  positionForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder,
    private positionService: PositionService,
    private toastrService: ToastrService
  ) {
    this.positionForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      abbreviation: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]
      ]
    });
  }

  // dailog close
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.options = this.data.options;
    this.abilities = [];
    this.abilities = this.data.abilities;
    this.patchValues();
  }
  patchValues() {
    if (this.data.data) {
      this.positionForm.patchValue(this.data.data);
      this.selectedAbilities = [];
      this.abilities.forEach((element: any) => {
        this.data.data.abilities.forEach((el: any) => {
          if (element.id == el.id) {
            element.is_checked = true;
            this.selectedAbilities.push(element.id);
          }
        });
      });
    }
  }
  ngOnDestroy() {
    this.abilities = [];
    if (this.data.data) {
      this.data.data.abilities = [];
    }
  }

  onChangeAbility(event: any, ability: any) {
    if (event.checked) {
      if (!this.selectedAbilities.includes(ability.id)) {
        this.selectedAbilities.push(ability.id);
      }
    } else {
      this.selectedAbilities.forEach((element: any, index) => {
        if (element == ability.id) {
          this.selectedAbilities.splice(index, 1);
        }
      });
    }
  }

  editAddFormValue() {
    if (this.positionForm.invalid) {
      return;
    }
    let requestData = this.positionForm.value;
    requestData['abilities'] = this.selectedAbilities;
    if (this.data.data) {
      this.updateData(requestData);
    } else {
      this.addData(requestData);
    }
  }

  updateData(requestData: any) {
    this.positionService
      .updatePosition(this.data.data.id, requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('refresh');
          this.toastrService.success(
            `${response.message}`,
            'Position Updated Successfully'
          );
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }

  addData(requestData: any) {
    this.positionService
      .addPosition(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('refresh');
          this.toastrService.success(
            `${response.message}`,
            'Position Added Successfully'
          );
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }
}
