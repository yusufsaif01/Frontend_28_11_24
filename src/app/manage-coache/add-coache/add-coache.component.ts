import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddcoacheTableConfig } from './add-coache-table-conf';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';
import { ManagecoacheService } from '../manage-coache.service';
import { untilDestroyed } from '@app/core';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged } from 'rxjs/operators';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';

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

@Component({
  selector: 'app-add-coache',
  templateUrl: './add-coache.component.html',
  styleUrls: ['./add-coache.component.scss'],
  providers: [CapitalizePipe]
})
export class AddcoacheComponent implements OnInit, OnDestroy {
  // TABLE CONFIG
  public tableConfig: AddcoacheTableConfig = new AddcoacheTableConfig();
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
    private _managecoacheService: ManagecoacheService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddcoacheComponent>,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private capitalize?: CapitalizePipe
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
    console.log('dindPlayerFormValue', this.findPlayerForm.value);
    this._managecoacheService
      .findPlayer(this.findPlayerForm.value)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
            // records[i]['avatar'] =  records[i]['avatar'];
          }
          if (response.data.total) {
            this.totalRecordSubject$.next(false);
          } else {
            this.totalRecordSubject$.next(true);
          }
          if (records.length) {
            this.prepareResponse(records);
          }
          console.log('record is=>', records);
          this.dataSource = new MatTableDataSource(records);
          this.show_count = response.data.records.length;
          this.total_count = response.data.total;
          if (!response.data.total) {
            this._toastrService.error('find player', 'No player found');
          }
        },
        error => {
          this._toastrService.error(`${error.error.message}`, 'Find Player');
        }
      );
  }

  prepareResponse(records: any) {
    records.forEach((element: any) => {
      element.player_name = {
        name: element.name,
        profileUrl:
          environment.mediaUrl + '/member/profile/public/' + element.user_id
      };
    });
    return records;
  }

  sendFootPlayerRequest(user_id: string) {
    console.log('inside sendFootPlayerRequesta');
    console.log(user_id);
    this._managecoacheService
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
    this._managecoacheService
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
    member_type: string,
    status: string
  ) {
    console.log(is_verified, club_name, member_type, status);
    if (status === 'pending') {
      return {
        message: 'Add request sent',
        state: true
      };
    } else if (status === 'added') {
      return {
        message: 'Already added',
        state: true
      };
    } else if (['club', 'academy'].includes(member_type)) {
      return { message: 'These details are for club/ academy', state: true };
    } else if (
      is_verified &&
      (!club_name || this.own_member_type == 'academy')
    ) {
      return { message: 'Add', state: false };
    } else if (is_verified && club_name) {
      return {
        message: `This player is already a member of ${this.capitalize.transform(
          club_name
        )}`,
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
  checkRequiredValidator(
    form: FormGroup,
    controlObject: { [name: string]: ValidatorFn[] },
    require: boolean
  ) {
    const [name] = Object.keys(controlObject);

    let controlName = form.get(name);
    let validationArray = controlObject[name];
    if (require) {
      validationArray = [
        ...new Set([...controlObject[name], Validators.required])
      ];
    } else {
      validationArray = validationArray.filter(
        validator => validator !== Validators.required
      );
    }

    controlName.setValidators(validationArray);
    controlName.updateValueAndValidity();
  }

  setValidators() {
    const name = this.findPlayerForm.get('name');
    const phone = this.findPlayerForm.get('phone');
    const email = this.findPlayerForm.get('email');

    this.setControlValidation(this.findPlayerForm, emailControl);
    this.setControlValidation(this.findPlayerForm, phoneControl);

    phone.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value) {
        this.checkRequiredValidator(
          this.findPlayerForm,
          { email: emailControl.email },
          false
        );
      } else {
        this.checkRequiredValidator(
          this.findPlayerForm,
          { email: emailControl.email },
          true
        );
      }
    });

    email.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value) {
        this.checkRequiredValidator(
          this.findPlayerForm,
          { phone: phoneControl.phone },
          false
        );
      } else {
        this.checkRequiredValidator(
          this.findPlayerForm,
          { phone: phoneControl.phone },
          true
        );
      }
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
