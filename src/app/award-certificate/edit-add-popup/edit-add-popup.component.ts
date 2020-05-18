import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AwardCertificateService } from '../award-certificate.service';
import { ToastrService } from 'ngx-toastr';
import { requiredFileAvatar } from '@app/shared/validators/requiredFileAvatar';
import { environment } from '../../../environments/environment';
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
  providers: [{ provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
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
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.createForm();
    this.player_type = data.player_type;
    this.member_type = data.member_type;
    this.options = data.options;
  }

  closeDatePicker(
    elem: MatDatepicker<any>,
    event: MatDatepickerInputEvent<Date>
  ) {
    elem.close();
    let year = new Date(String(event));
    this.editAddForm.get('year').setValue(year);
  }

  ngOnInit() {
    if (this.member_type === 'player') {
      this.awardsArray = this.playerAwardTypeArray;
    } else if (this.member_type === 'club') {
      this.awardsArray = this.clubAwardTypeArray;
    } else if (this.member_type === 'academy') {
      this.awardsArray = this.academyAwardTypeArray;
    }
    if (this.data.id) {
      this.editAddForm.patchValue(this.data);
      this.editAddForm.patchValue({ year: new Date(this.data.year) });
    }
    if (this.data.media !== this.environment.mediaUrl) {
      this.achievement_url = this.data.media;
    }
  }

  ngOnDestroy() {}

  clubAwardTypeArray = [
    {
      name: 'Club Level Competition Certificates',
      value: 'Club Level Competition Certificates'
    },
    {
      name: 'Other Awards',
      value: 'Other Awards'
    }
  ];
  academyAwardTypeArray = [
    {
      name: 'Private Tournament Certificates',
      value: 'Private Tournament Certificates'
    },
    {
      name: 'Other Awards',
      value: 'Other Awards'
    }
  ];

  playerAwardTypeArray = [
    {
      name: 'School Tournament Certificates',
      value: 'School Tournament Certificates'
    },
    {
      name: 'Private Tournament Certificates',
      value: 'Private Tournament Certificates'
    },
    {
      name: 'National Tournaments',
      value: 'National Tournaments'
    },
    {
      name: 'State Level Tournaments',
      value: 'State Level Tournaments'
    },
    {
      name: 'Club Level Tournaments',
      value: 'Club Level Tournaments'
    },
    {
      name: 'Academy Level Tournaments',
      value: 'Academy Level Tournaments'
    },
    {
      name: 'International Tournament Certificates',
      value: 'International Tournament Certificates'
    },
    {
      name: 'Other Awards',
      value: 'Other Awards'
    }
  ];

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
      name: [
        '',
        [
          Validators.maxLength(30),
          Validators.pattern(/^[a-zA-Z]+|[0-9]?[a-zA-Z]+[0-9]?$/)
        ]
      ],
      year: ['', [Validators.required]],
      position: [
        '',
        [Validators.maxLength(20), Validators.pattern(/^[0-9a-zA-Z]+%?$/)]
      ],
      achievement: ['', [requiredFileAvatar]]
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

          this.toastrService.success(
            `${response.message}`,
            'Award Updated Successfully'
          );
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
            'Award Added Successfully'
          );
        },
        error => {
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      );
  }

  dateModifier(requestData: any) {
    let year = this.editAddForm.controls.year.value;
    year = new Date(year).getFullYear();
    requestData.set('year', year);
  }
}
