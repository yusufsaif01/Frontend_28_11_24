import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddFootPlayerTableConfig } from './add-footplayer-table-conf';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';
import { FootPlayerService } from '../foot-player.service';
import { untilDestroyed } from '@app/core';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-add-footplayer',
  templateUrl: './add-footplayer.component.html',
  styleUrls: ['./add-footplayer.component.scss']
})
export class AddFootplayerComponent implements OnInit, OnDestroy {
  // TABLE CONFIG
  public tableConfig: AddFootPlayerTableConfig = new AddFootPlayerTableConfig();
  public dataSource = new MatTableDataSource([]);

  own_member_type: string;
  findPlayerForm: FormGroup;
  environment = environment;
  show_count: number;
  total_count: number;
  pageSize: number = 5;
  selectedPage: number = 1;
  totalRecordSubject$ = new Subject();

  constructor(
    private _footPlayerService: FootPlayerService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddFootplayerComponent>,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.createForm();
    this.own_member_type = data.member_type;
  }
  ngOnDestroy() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.setValidators();
  }

  findPlayer() {
    this._footPlayerService
      .findPlayer(this.findPlayerForm.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
          }
          if (response.data.total) {
            this.totalRecordSubject$.next(false);
          } else {
            this.totalRecordSubject$.next(true);
          }
          if (records.length) {
            this.prepareResponse(records);
          }
          this.dataSource = new MatTableDataSource(records);
          this.show_count = response.data.records.length;
          this.total_count = response.data.total;
          if (!response.data.total) {
            this._toastrService.error('No player found', 'Find Player');
          }
        },
        error => {
          this._toastrService.error(`${error.error.message}`, 'Find Player');
        }
      );
  }
  prepareResponse(records: any) {
    records.forEach((element: any) => {
      element.playerName = {
        name: element.name,
        profileUrl:
          environment.mediaUrl + '/member/profile/view/' + element.user_id
      };
    });
  }
  attachDocumentUrl(documentUrl: string) {
    return environment.mediaUrl + documentUrl;
  }

  sendFootPlayerRequest(user_id: string) {
    this._footPlayerService
      .sendFootPlayerRequest({ to: user_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success(`Success`, 'Send request successfully');
          this.dialogRef.close(true);
        },
        error => {
          this._toastrService.error(
            `${error.error.message}`,
            'Request Footplayer'
          );
        }
      );
  }

  sendFootPlayerInvite() {
    let formValues = this.findPlayerForm.value;
    Object.keys(formValues).forEach(
      key => formValues[key] == '' && delete formValues[key]
    );
    this._footPlayerService
      .sendFootPlayerInvite(formValues)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this._toastrService.success('Success', 'Send invite successfully');
          this.dialogRef.close(true);
        },
        error => {
          this._toastrService.error(
            `${error.error.message}`,
            'Invite Footplayer'
          );
        }
      );
  }

  getStateToolTip(
    is_verified: boolean,
    club_name: string,
    member_type: string
  ) {
    if (['club', 'academy'].includes(member_type)) {
      return { message: 'These details are for club/ academy', state: true };
    } else if (
      is_verified &&
      (!club_name || this.own_member_type == 'academy')
    ) {
      return { message: 'ADD', state: false };
    } else if (is_verified && club_name) {
      return {
        message: `This player is already a member of ${club_name}`,
        state: true
      };
    } else if (!is_verified) {
      return {
        message: 'These details are for not-verified player',
        state: true
      };
    }
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
  checkRequiredValidator(controlname: any, paramname: any, type: number) {
    if (type === 1)
      paramname.includes(Validators.required)
        ? controlname
        : paramname.push(Validators.required);
    else if (type === 2)
      paramname.includes(Validators.required)
        ? paramname.splice(paramname.findIndex(Validators.required), 1)
        : controlname;
  }

  setValidators() {
    const phone = this.findPlayerForm.get('phone');
    const email = this.findPlayerForm.get('email');
    let emailControl = {
      email: [Validators.required, Validators.email]
    };
    let phoneControl = {
      phone: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/)
      ]
    };
    this.setControlValidation(this.findPlayerForm, emailControl);
    this.setControlValidation(this.findPlayerForm, phoneControl);

    phone.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value) {
        this.checkRequiredValidator(emailControl, emailControl.email, 2);
      } else {
        this.checkRequiredValidator(emailControl, emailControl.email, 1);
      }
      this.setControlValidation(this.findPlayerForm, emailControl);
    });

    email.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value) {
        this.checkRequiredValidator(phoneControl, phoneControl.phone, 2);
      } else {
        this.checkRequiredValidator(phoneControl, phoneControl.phone, 1);
      }
      this.setControlValidation(this.findPlayerForm, phoneControl);
    });
  }

  createForm() {
    this.findPlayerForm = this._formBuilder.group({
      name: [''],
      email: [''],
      phone: ['']
    });
  }
}
