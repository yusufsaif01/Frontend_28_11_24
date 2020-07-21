import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  DocumentsService,
  GetDocumentsResponseDetails
} from './documents.service';
import { untilDestroyed } from '@app/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@env/environment';
import { requiredFileAvatar } from '@app/shared/validators/requiredFileAvatar';
import { requiredPdfDocument } from '@app/shared/validators/requiredPdfDocument';
import { distinctUntilChanged } from 'rxjs/operators';

let aadharImageControl = {
  aadhar_front: [Validators.required, requiredFileAvatar],
  aadhar_back: [Validators.required, requiredFileAvatar]
};
let aadharPdfControl = {
  aadhar: [Validators.required, requiredPdfDocument]
};
let playerImageControl = {
  player_photo: [Validators.required, requiredFileAvatar]
};

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  profile_status: string;
  environment = environment;
  aadhar_number: string;
  aadhar: File;
  aadhar_front: File;
  aadhar_back: File;
  player_photo: File;
  aadhar_url: string;
  aadhar_front_url: string;
  aadhar_back_url: string;
  player_photo_url: string;
  documentsDetails: GetDocumentsResponseDetails['data'];
  documentsDetailsForm: FormGroup;
  member_type: string = localStorage.getItem('member_type');
  viewMode = true;
  player_photo_preview: string | ArrayBuffer;

  constructor(
    private _formBuilder: FormBuilder,
    private _documentsService: DocumentsService,
    private _toastrService: ToastrService
  ) {
    this.createForm();
    this.populateView();
  }

  ngOnInit() {
    this.setCategoryValidators();
  }

  createForm() {
    this.documentsDetailsForm = this._formBuilder.group({
      aadhar: [''],
      aadhar_number: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
          Validators.pattern(/^\d+$/)
        ]
      ],
      aadhar_media_type: ['', [Validators.required]],
      aadhar_front: ['', []],
      aadhar_back: ['', []],
      player_photo: ['', [Validators.required, requiredFileAvatar]]
    });
  }

  toggleMode() {
    this.viewMode = !this.viewMode;
  }
  populateDocuments() {
    if (
      this.documentsDetails.documents &&
      this.documentsDetails.documents.length !== 0
    ) {
      this.documentsDetails.documents.forEach(document => {
        let fileLink = this.environment.mediaUrl;
        let rootMedia = document.media;

        if (document.type === 'aadhar') {
          this.aadhar_number = document.document_number;
          if (document.media.attachment_type === 'pdf') {
            this.aadhar_url = fileLink + rootMedia.document;
          } else if (document.media.attachment_type === 'image') {
            this.aadhar_front_url = fileLink + rootMedia.doc_front;
            this.aadhar_back_url = fileLink + rootMedia.doc_back;
          }
          this.player_photo_url = fileLink + rootMedia.user_photo;
        }
      });
    }
  }

  isVerifiedDocument(documentType: string, condition: boolean | string) {
    return this.documentsDetails && this.documentsDetails.documents.some(document => {
      if (document.type === documentType) {
        return document.status === condition;
      }
    });
  }

  setControlState() {
    let controls = [
      'aadhar',
      'aadhar_front',
      'aadhar_back',
      'aadhar_number',
      'aadhar_media_type',
      'player_photo'
    ];
    if (this.profile_status === 'verified') {
      controls.forEach(control => {
        if (this.documentsDetailsForm.get(control)) {
          this.documentsDetailsForm.get(control).disable();
        }
      });
    }
  }

  populateFormFields() {
    if (this.documentsDetails.member_type === 'player') {
      if (
        this.documentsDetails.documents &&
        this.documentsDetails.documents.length &&
        this.documentsDetails.documents[0].media &&
        this.documentsDetails.documents[0].media.attachment_type
      ) {
        this.documentsDetailsForm
          .get('aadhar_media_type')
          .setValue(this.documentsDetails.documents[0].media.attachment_type);
      }
    }

    this.documentsDetailsForm.patchValue({
      aadhar_number:
        this.documentsDetails.documents &&
          this.documentsDetails.documents.length
          ? this.documentsDetails.documents[0].document_number
          : ''
    });
  }
  populateView() {
    this._documentsService
      .getDocumentsDetails()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.documentsDetails = response.data;
          this.profile_status = this.documentsDetails.profile_status.status;
          this.populateDocuments();
          this.populateFormFields();
          this.setControlState();
          this.checkFileValidations();
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  setControlValidation(
    form: FormGroup,
    controlObject: { [name: string]: ValidatorFn[] }
  ) {
    for (const name in controlObject) {
      let controlName = form.get(name);
      controlName.setValidators(controlObject[name]);
      controlName.updateValueAndValidity();
    }
  }

  setPlayerValidators() {
    const aadhar_front = this.documentsDetailsForm.get('aadhar_front');
    const aadhar_back = this.documentsDetailsForm.get('aadhar_back');
    const aadhar = this.documentsDetailsForm.get('aadhar');
    const aadhar_media_type = this.documentsDetailsForm.get(
      'aadhar_media_type'
    );

    aadhar_media_type.valueChanges.subscribe(value => {
      if (value === 'image') {
        aadhar_front.setValue('');
        aadhar_back.setValue('');
        this.setControlValidation(
          this.documentsDetailsForm,
          aadharImageControl
        );

        aadhar.setValidators(null);
      } else if (value === 'pdf') {
        aadhar.setValue('');
        this.setControlValidation(this.documentsDetailsForm, aadharPdfControl);
        aadhar_front.setValidators(null);
        aadhar_back.setValidators(null);
      }
      aadhar_front.updateValueAndValidity();
      aadhar_back.updateValueAndValidity();
      aadhar.updateValueAndValidity();
    });
  }

  setCategoryValidators() {
    if (this.member_type === 'player') {
      this.setPlayerValidators();
    }
  }

  preview(files: FileList) {
    if (files.length === 0) return;

    const data = files[0].name.replace(/^.*[\\\/]/, '').split('.');
    const extension = data[data.length - 1];
    if (
      'png' !== extension.toLowerCase() &&
      'jpeg' !== extension.toLowerCase() &&
      'jpg' !== extension.toLowerCase()
    ) {
      this.player_photo_preview = 'assets/images/member/avatar-square.png';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.player_photo_preview = reader.result;
    };
  }

  uploadPlayerPhoto(files: FileList) {
    this.player_photo = files[0];
    this.preview(files);
  }

  uploadAadhar(files: FileList, type?: string) {
    if (type == 'single') this.aadhar = files[0];
    if (type == 'front') this.aadhar_front = files[0];
    if (type == 'back') this.aadhar_back = files[0];
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

  setRequestDataObject(requestData: any, name: string) {
    requestData.set(
      name,
      JSON.stringify(this.documentsDetailsForm.get(name).value)
    );
  }

  editDocumentsDetails() {
    let aadhar_media_type = this.documentsDetailsForm.get('aadhar_media_type');
    let requestData = this.toFormData(this.documentsDetailsForm.value);
    if (this.member_type === 'player') {
      if (aadhar_media_type.value === 'pdf' && this.aadhar) {
        requestData.set('aadhar', this.aadhar);
        requestData.delete('aadhar_front');
        requestData.delete('aadhar_back');
      } else if (
        aadhar_media_type.value === 'image' &&
        this.aadhar_front &&
        this.aadhar_back
      ) {
        requestData.delete('aadhar');
        requestData.set('aadhar_front', this.aadhar_front);
        requestData.set('aadhar_back', this.aadhar_back);
      } else {
        requestData.delete('aadhar_media_type');
      }

      if (this.player_photo) requestData.set('player_photo', this.player_photo);
      this._documentsService
        .editDocumentsDetails(requestData)
        .pipe(untilDestroyed(this))
        .subscribe(
          response => {
            this._toastrService.success(
              'Successful',
              'Documents updated successfully'
            );
            this.initializeFields();
            this.populateView();
            this.toggleMode();
          },
          error => {
            this._toastrService.error(error.error.message, 'Error');
          }
        );
    }
  }

  initializeFields() {
    this.aadhar_url = '';
    this.aadhar_front_url = '';
    this.aadhar_back_url = '';
    this.documentsDetailsForm.get('player_photo').setValue('');
  }

  checkFileValidations() {
    if (this.documentsDetails.documents) {
      this.documentsDetails.documents.forEach(documents => {
        if (documents.type === 'aadhar') {
          this.removeFileValidations('player_photo');
          if (documents.media.attachment_type === 'pdf')
            this.removeFileValidations('aadhar');
          if (documents.media.attachment_type === 'image') {
            this.removeFileValidations('aadhar_front');
            this.removeFileValidations('aadhar_back');
          }
        }
      });
    }
    let fields = {
      aadhar: aadharPdfControl,

      aadhar_front: {
        aadhar_front: aadharImageControl.aadhar_front
      },
      aadhar_back: {
        aadhar_back: aadharImageControl.aadhar_back
      },
      player_photo: {
        player_photo: playerImageControl.player_photo
      }
    };

    Object.keys(fields).forEach(field => {
      let control = this.documentsDetailsForm.get(field);
      control.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
        this.setControlValidation(this.documentsDetailsForm, fields[field]);
      });
    });
  }

  removeFileValidations(type: string) {
    const fileValidation = this.documentsDetailsForm.get(type);
    fileValidation.setValidators(null);
    fileValidation.updateValueAndValidity();
  }

  ngOnDestroy() { }
}
