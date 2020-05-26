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
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
    if (this.data) {
      this.patchValue();
    }
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

  patchValue() {
    this.createPostForm.patchValue(this.data.post);
    this.imageURL = this.data.post.media_url;
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

  createNewPost() {
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

      if (!value && !value.length) {
        continue;
      }
      formData.append(key, value);
    }
    return formData;
  }

  onClickSave() {
    if (this.data) {
      this.updatePost();
    } else {
      this.createNewPost();
    }
  }
  updatePost() {
    let body: any = {};
    body = this.data.post;
    body.text = this.createPostForm.value.text;
    delete body.media_type;
    delete body.media_url;
    let requestData = this.toFormData(body);
    if (this.media) requestData.set('media', this.media);
    this.service
      .updatePost(this.data.id, requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('success');
        },
        error => {
          this.toastrService.error('Error', error.error.message);
        }
      );
  }

  ngOnDestroy() {}
}
