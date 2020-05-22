import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TimelineService } from '../timeline.service';
import { untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-post-popup',
  templateUrl: './post-popup.component.html',
  styleUrls: ['./post-popup.component.scss']
})
export class PostPopupComponent implements OnInit {
  createPostForm: FormGroup;
  media: File;
  imageURL: string = '';

  constructor(
    public dialogRef: MatDialogRef<PostPopupComponent>,
    private formBuilder: FormBuilder,
    private service: TimelineService,
    private toastrService: ToastrService // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  createForm() {
    this.createPostForm = this.formBuilder.group({
      text: [''],
      media: ['']
    });
  }

  changeMedia(files: FileList) {
    if (!files || files.length === 0) {
      this.imageURL = '';
      this.media = undefined;
      return;
    }
    this.media = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imageURL = reader.result.toString();
    };
  }

  onCreatePost() {
    let requestData = this.toFormData(this.createPostForm.value);
    if (this.media) requestData.set('media', this.media);
    this.service
      .createPost(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          console.log(response);
          this.dialogRef.close('success');
        },
        (error: any) => {
          this.toastrService.error('Error', error.error.message);
        }
      );
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];

      if (!value && !value.length && key != 'bio') {
        continue;
      }
      formData.append(key, value);
    }
    return formData;
  }

  ngOnDestroy() {}
}
