import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, untilDestroyed } from '@app/core';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '@app/shared/static-data/static-data';
import { MatDialog } from '@angular/material/dialog';
import { GuideComponent } from '@app/guide/guide.component';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  activeForm: string = 'player';
  tooltip: string = '';
  typeArray: any[] = [];
  playerType: any[] = Constants.PLAYER_TYPE;
  coacheType: any[] = Constants.PLAYER_TYPE;
  clubAcademyType: any[] = Constants.CLUB_ACADEMY_TYPE;
  registrationForm: FormGroup;
  // today = new Date();
  maxDate: Date;
  // isTermsAccepted: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService
  ) {
    this.createForm();

    const currentDate = new Date();
    this.maxDate = new Date(
      currentDate.getFullYear() - 6,
      currentDate.getMonth(),
      currentDate.getDate()
    );
  }

  ngOnDestroy() {}

  ngOnInit() {
    this.typeArray = this.playerType;
    this.setPlayerValidators();
  }

  clearValidators() {
    this.registrationForm.controls.name.clearValidators();
    this.registrationForm.controls.name.updateValueAndValidity();
    this.registrationForm.controls.first_name.clearValidators();
    this.registrationForm.controls.first_name.updateValueAndValidity();
    this.registrationForm.controls.last_name.clearValidators();
    this.registrationForm.controls.last_name.updateValueAndValidity();
    this.registrationForm.controls.type.clearValidators();
    this.registrationForm.controls.type.updateValueAndValidity();
    this.registrationForm.controls.dob.clearValidators();
    this.registrationForm.controls.dob.updateValueAndValidity();
  }

  setPlayerValidators() {
    this.clearValidators();
    this.registrationForm.controls.first_name.setValidators([
      Validators.required,
      Validators.maxLength(25),
      Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
    ]);
    this.registrationForm.controls.last_name.setValidators([
      Validators.required,
      Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
    ]);
    this.registrationForm.controls.dob.setValidators([Validators.required]);
  }

  setClubAcademyValidators() {
    this.clearValidators();
    this.registrationForm.controls.name.setValidators([
      Validators.required,

      Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
    ]);
    this.registrationForm.controls.type.setValidators([Validators.required]);
    this.registrationForm.controls.type.patchValue('');
  }

  toggleForm(formName: string) {
    this.activeForm = formName;
    this.resetFormFields();

    if (this.activeForm === 'club' || this.activeForm === 'academy') {
      this.setClubAcademyValidators();
      this.typeArray = this.clubAcademyType;
    }
    if (this.activeForm === 'player' || this.activeForm === 'coach') {
      this.setPlayerValidators();
      this.typeArray = this.playerType;
    }
  }
  openDialogformsg(): void {
    const dialogRef = this.dialog.open(GuideComponent, {
      panelClass: 'postpopup'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
      }
    });
  }
  resetFormFields() {
    this.registrationForm.reset();
    this.tooltip = '';
    if (this.activeForm === 'club' || this.activeForm === 'academy') {
      this.setClubAcademyValidators();
    }
    if (this.activeForm === 'player') {
      this.setPlayerValidators();
    }
  }

  register() {
    let form_data = this.registrationForm.value;
    console.log('-----------------------');
    console.log(this.registrationForm.value);
    form_data.member_type = this.activeForm;
    if (this.activeForm === 'club' || this.activeForm === 'academy') {
      delete form_data.first_name;
      delete form_data.last_name;
      delete form_data.dob;
    }
    if (this.activeForm === 'player' || this.activeForm === 'coach') {
      delete form_data.name;
      delete form_data.type;
    }

    //
    this._authenticationService
      .register(form_data)
      .pipe(untilDestroyed(this))
      .subscribe(
        credentials => {
          this.resetFormFields();
          //  this.openDialogformsg();
          if (credentials.status === 'success') {
            this.router.navigate([
              this.route.snapshot.queryParams.redirect ||
                'otp/otp-verfication-type'
            ]);
          }

          console.log('credentialsss', credentials);
          console.log('form data is ', form_data);
          localStorage.setItem('email', form_data.email);
          localStorage.setItem('name', form_data.name);
          localStorage.setItem('userId', form_data.userId);
          localStorage.setItem('mobile_number', form_data.phone);
        },
        error => {
          this._toastrService.error(`${error.error.message}`, 'Failed');
        }
      );
  }
  // Custom validator function
  // ageValidator(minAge: number) {
  //   return (control: AbstractControl) => {
  //     const currentDate = new Date();
  //     const selectedDate = new Date(control.value);

  //     const yearsDiff = currentDate.getFullYear() - selectedDate.getFullYear();
  //     const monthsDiff = currentDate.getMonth() - selectedDate.getMonth();
  //     const daysDiff = currentDate.getDate() - selectedDate.getDate();

  //     const ageInYears = yearsDiff + (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0) ? -1 : 0);

  //     if (ageInYears < minAge) {
  //       return { minAge: true };
  //     }

  //     return null;
  //   };
  // }

  createForm() {
    console.log('inside create form');
    this.registrationForm = this._formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      country_code: ['+91', [Validators.required]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]+$/)
        ]
      ],
      name: [''],
      type: ['', [Validators.required]],
      dob: ['', [Validators.required]], // Add the custom validator
      termsAccepted: [false, [Validators.requiredTrue]]
    });
  }

  onSelectType(typeValue: string) {
    switch (typeValue) {
      case '':
        this.tooltip = '';
        break;
      case 'grassroot':
        this.tooltip = 'Players between 6-12 years.';
        break;
      case 'amateur':
        this.tooltip =
          'Players who have never received any remuneration nor they currently have an employment contract with a club/ academy.';
        break;
      case 'professional':
        this.tooltip =
          'Players who are currently employed by club/ academy and have an official written contract.';
        break;
      case 'Residential':
        this.tooltip =
          'Type that consist of residential rooms, bathrooms, toilets, dining room, kitchen, leisure/recreation room and schooling for players.';
        break;
      case 'Non-Residential':
        this.tooltip =
          'Type that does not consist of residential rooms, bathrooms, toilets, dining room, kitchen, leisure/recreation room and schooling for players.';
        break;
    }
  }
}
