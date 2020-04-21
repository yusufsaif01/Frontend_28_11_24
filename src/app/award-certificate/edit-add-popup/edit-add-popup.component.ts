import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AwardCertificateService } from '../award-certificate.service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-add-popup',
  templateUrl: './edit-add-popup.component.html',
  styleUrls: ['./edit-add-popup.component.scss']
})
export class EditAddPopupComponent implements OnInit, OnDestroy {
  editAddForm: FormGroup;
  achievement: File;
  member_type: string = localStorage.getItem('member_type') || 'player';
  player_type: string = 'amateur';
  awardsArray: {name:string;value:string}[];

  constructor(
    public dialogRef: MatDialogRef<EditAddPopupComponent>,
    private formBuilder: FormBuilder,
    private awardCertificateService: AwardCertificateService,
    private toastrService:ToastrService
  ) {
    this.createForm();
  }


  ngOnInit() {
    if(this.member_type==='player'){
      if(this.player_type==='grassroot'){
        this.awardsArray = this.grassrootsAwardTypeArray
      }
      else if(this.player_type==='amateur'){
        this.awardsArray = this.grassrootsAwardTypeArray
      }
      else if(this.player_type==='professional'){
        this.awardsArray = this.grassrootsAwardTypeArray
      }
    }
  }
  ngOnDestroy() {}

  grassrootsAwardTypeArray = [
    {
      name:'School Tournament Certificates',
      value:'School Tournament Certificates',
    },
    {
      name:'Private Tournament Certificates',
      value:'Private Tournament Certificates',
    },
    {
      name:'National Tournaments',
      value:'National Tournaments',
    },
    {
      name:'State Level Tournaments',
      value:'State Level Tournaments',
    },
    {
      name:'Club Level Tournaments',
      value:'Club Level Tournaments',
    },
    {
      name:'Academy Level Tournaments',
      value:'Academy Level Tournaments',
    },
    {
      name:'International Tournament Certificates',
      value:'International Tournament Certificates',
    },
    {
      name:'Other Awards',
      value:'Other Awards',
    }
  ];

  amateursAwardTypeArray = [
    {
      name:'School Tournament Certificates',
      value:'School Tournament Certificates',
    },
    {
      name:'Private Tournament Certificates',
      value:'Private Tournament Certificates',
    },
    {
      name:'National Tournaments',
      value:'National Tournaments',
    },
    {
      name:'State Level Tournaments',
      value:'State Level Tournaments',
    },
    {
      name:'Club Level Certificates',
      value:'Club Level Certificates',
    },
    {
      name:'Academy Level Certificates',
      value:'Academy Level Certificates',
    },
    {
      name:'International Tournament Certificates',
      value:'International Tournament Certificates',
    },
    {
      name:'Individual Awards',
      value:'Individual Awards',
    }
  ];

  professionalsAwardTypeArray = [
    {
      name:'Club Level Competition Certificates',
      value:'Club Level Competition Certificates',
    },
    {
      name:'Academy Level Certificates',
      value:'Academy Level Certificates',
    },
    {
      name:'School Tournament Certificates',
      value:'School Tournament Certificates',
    },
    {
      name:'Private Tournament Certificates',
      value:'Private Tournament Certificates',
    },
    {
      name:'International Tournament Certificates',
      value:'International Tournament Certificates',
    },
    {
      name:'National Tournaments',
      value:'National Tournaments',
    },
    {
      name:'State Level Tournaments ',
      value:'State Level Tournaments ',
    },
    {
      name:'Individual Awards',
      value:'Individual Awards'
    }
  ];

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

  uploadAchievement(files: FileList) {
    this.achievement = files[0];
    console.log('achievement', this.achievement);
  }
  editAddFormValue() {
    console.log(this.editAddForm.value);
    let requestData = this.toFormData(this.editAddForm.value);
    if(this.achievement) requestData.set('achievement',this.achievement)
    const award$ = this.awardCertificateService.addAwards(requestData);
    award$
      .pipe(
        finalize(()=>{
          this.editAddForm.markAsPristine()
        }),
        untilDestroyed(this)
      )
      .subscribe(
        response =>{
          console.log('server response',response);    
          this.toastrService.success(`${response.message}`, 'Award Added Successfully');  
        },
        error => {
          console.log('error',error)
          this.toastrService.error(`${error.error.message}`, 'Error');
        }
      )

  }
}
