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
import { requiredFileAvatar } from '@app/shared/validators/requiredFileAvatar';
import { NgxImageCompressService } from 'ngx-image-compress';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-post-popup',
  templateUrl: './post-popup.component.html',
  styleUrls: ['./post-popup.component.scss']
})
export class PostPopupComponent implements OnInit {
  createPostForm: FormGroup;
  media: Blob;
  imageURL: string = '';
  savedMedia: File;
  convertedFile: File;
  imageQuality: number = 10;

  constructor(
    public dialogRef: MatDialogRef<PostPopupComponent>,
    private formBuilder: FormBuilder,
    private service: TimelineService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageCompress: NgxImageCompressService,
    private loaderService: NgxSpinnerService
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
      media: ['', [requiredFileAvatar]]
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
      this.convertedFile = undefined;
      return;
    }

    if (this.createPostForm.controls.media.errors)
      return this.toastrService.error(
        'Error',
        'Post Image must be of type JPEG / JPG / PNG'
      );
    this.loaderService.show();
    this.savedMedia = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = async _event => {
      let base64 = reader.result.toString();
      let imageSize = this.imageCompress.byteCount(base64) / 1024;
      console.log('Size in KB before:', imageSize);
      this.checkImageQuality(imageSize);
      console.log(this.imageQuality);
      try {
        let result = await this.imageCompress.compressFile(
          base64,
          null,
          100,
          this.imageQuality
        );
        this.imageURL = result;
        console.log(
          'Size in KB now:',
          this.imageCompress.byteCount(result) / 1024
        );
        let fetchData = await fetch(this.imageURL);
        let blob = await fetchData.blob();
        this.media = blob;
        this.loaderService.hide();
        this.convertedFile = new File([this.media], this.savedMedia.name, {
          type: this.savedMedia.type,
          lastModified: this.savedMedia.lastModified
        });
      } catch (e) {
        this.toastrService.error('File proccess error', e);
        this.imageErrorHandler();
      }
    };
  }
  checkImageQuality(imageSize: number) {
    if (imageSize < 500) {
      this.imageQuality = 50;
      return;
    }
    if (imageSize > 500 && imageSize < 1024) {
      this.imageQuality = 30;
    }
    if (imageSize > 1024 && imageSize < 5000) {
      this.imageQuality = 20;
    }
    if (imageSize > 5000 && imageSize < 10000) {
      this.imageQuality = 10;
    }
    if (imageSize > 10000) {
      this.imageQuality = 5;
    }
  }
  imageErrorHandler() {
    this.loaderService.hide();
    this.imageURL = '';
    this.convertedFile = undefined;
  }

  createNewPost() {
    let requestData = this.toFormData(this.createPostForm.value);

    if (this.media) requestData.set('media', this.convertedFile);
    this.service
      .createPost(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
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
    delete body.status;
    let requestData = this.toFormData(body);
    if (this.media) requestData.set('media', this.convertedFile);
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
