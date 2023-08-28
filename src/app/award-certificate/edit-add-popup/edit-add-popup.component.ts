import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AwardCertificateService } from '../award-certificate.service';
import { ToastrService } from 'ngx-toastr';
import { requiredFileDocument } from '@app/shared/validators/requiredFileDocument';
import { DateConversion } from '@app/shared/utilities/date-conversion';
import { environment } from '@env/environment';
import { Constants } from '@app/shared/static-data/static-data';
import { untilDestroyed } from '@app/core';

interface ArrayTypeContext {
  name: string;
  value: string;
}

const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: { year: 'numeric' }
  }
};
@Component({
  selector: 'app-edit-add-popup',
  templateUrl: './edit-add-popup.component.html',
  styleUrls: ['./edit-add-popup.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    DateConversion
  ]
})
export class EditAddPopupComponent implements OnInit, OnDestroy {
  environment = environment;
  editAddForm: FormGroup;
  achievement: File;
  member_type: string = 'player';
  player_type: string = 'amateur';
  options: any = {};
  awardsArray: ArrayTypeContext[];

  minDate: Date = new Date(1970, 0, 1);
  maxDate: Date = new Date();

  achievement_url: String;

  constructor(
    public dialogRef: MatDialogRef<EditAddPopupComponent>,
    private formBuilder: FormBuilder,
    private awardCertificateService: AwardCertificateService,
    private toastrService: ToastrService,
    private _dateConversion: DateConversion,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.createForm();
    this.player_type = data.player_type;
    this.member_type = data.member_type;
    this.options = data.options;
  }

  closeDatePicker(
    elem: MatDatepicker<any>,
    event: MatDatepickerInputEvent<Date>,
    controlName: string
  ) {
    elem.close();
    let year = new Date(String(event));
    this.editAddForm.get(controlName).setValue(year);
  }

  ngOnInit() {
    if (this.member_type === 'player') {
      this.awardsArray = Constants.AWARD_TYPE.PLAYER;
    } else if (this.member_type === 'club') {
      this.awardsArray = Constants.AWARD_TYPE.CLUB;
    } else if (this.member_type === 'academy') {
      this.awardsArray = Constants.AWARD_TYPE.ACADEMY;
    }

    if (this.data.id) {
      this.editAddForm.patchValue(this.data);
      this.editAddForm.patchValue({
        from: new Date(this.data.from),
        to: new Date(this.data.to)
      });
    }

    if (this.data.media !== this.environment.mediaUrl) {
      this.achievement_url = this.data.media;
    }
  }

  ngOnDestroy() {}

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

  private createForm() {
    this.editAddForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.pattern(/^[a-zA-Z0-9\&\@\(\)\#\- ]+$/)]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      position: [
        '',
        [
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9\&\@\(\)\#\-\% ]+$/)
        ]
      ],
      achievement: ['', [requiredFileDocument]]
    });
  }

  uploadAchievement(files: FileList) {
    this.achievement = files[0];
  }

  updateData(requestData: any) {
    this.awardCertificateService
      .updateAwards(this.data.id, requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('refresh');

          this.toastrService.success(`Success`, 'Award updated successfully');
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }

  editAddFormValue() {
    let requestData = this.toFormData(this.editAddForm.value);
    if (this.achievement) requestData.set('achievement', this.achievement);
    this.dateModifier(requestData);

    if (this.data.id) {
      this.updateData(requestData);
    } else {
      this.addData(requestData);
    }
  }

  addData(requestData: any) {
    this.awardCertificateService
      .addAwards(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('refresh');

          this.toastrService.success(
            `${response.message}`,
            'Award added successfully'
          );
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }

  dateModifier(requestData: any) {
    let years = ['from', 'to'];
    years.map(data => {
      requestData.set(
        data,
        this._dateConversion.convertToYear(this.editAddForm.get(data).value)
      );
    });
    // let from_year = this.editAddForm.controls.from_year.value;
    // from_year = new Date(from_year).getFullYear();
    // requestData.set('from_year', from_year);
  }
}
