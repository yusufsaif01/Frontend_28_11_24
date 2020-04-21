import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-add-popup',
  templateUrl: './edit-add-popup.component.html',
  styleUrls: ['./edit-add-popup.component.scss']
})
export class EditAddPopupComponent implements OnInit {
  editAddForm: FormGroup;
  achievement : File;

  constructor(
    public dialogRef: MatDialogRef<EditAddPopupComponent>,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  onNoClick(): void {
    console.log('dialog closed');
    this.dialogRef.close();
  }

  ngOnInit() {}

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      console.log(key, value);
      if (!value && !value.length) {
        continue;
      }
      formData.append(key, value);
    }
    return formData;
  }


  private createForm() {
    this.editAddForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      name: ['', []],
      year: ['', [Validators.required]],
      position: ['', []]
    });
  }

  uploadAchievement(files: FileList){
    this.achievement = files[0]
    console.log('achievement',this.achievement);
    
  }
  editAddFormValue(){
    console.log(this.editAddForm.value);
    let requestData = this.toFormData(this.editAddForm.value);
    console.log(requestData);    


    // if(this.achievement) requestData.set('image',this.achievement)
    // console.log('dialog box while open',requestData);
    // return(requestData);
  }
}
