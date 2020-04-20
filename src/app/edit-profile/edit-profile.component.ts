import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { requiredFileDocument } from '@app/shared/validators/requiredFileDocument';
import { requiredFileAvatar } from '@app/shared/validators/requiredFileAvatar';
import { Router } from '@angular/router';
import { HeaderComponent } from '@app/shared/page-components/header/header.component';

interface trophyObject {
  name: string;
  year: string;
  position: string;
}

interface contactPersonObject {
  designation: string;
  name: string;
  email: string;
  phone_number: string;
}

interface topSigningObject {
  name: string;
}
interface topAcademyPlayerObject {
  name: string;
}

interface positionObject {
  name: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() max: Date | null;
  @ViewChild(HeaderComponent, { static: true }) header: HeaderComponent;
  tomorrow = new Date();
  environment = environment;
  avatar: File;
  aiff: File;
  document: File;
  aadhar: File;
  employment_contract: File;

  profile: any;
  member_type: string = localStorage.getItem('member_type') || 'player';
  player_type: string = 'grassroot';
  user_email = localStorage.getItem('email');
  aboutForm: FormGroup;
  socialProfileForm: FormGroup;
  editProfileForm: FormGroup;
  playerProfileForm: FormGroup;
  clubProfileForm: FormGroup;
  academyProfileForm: FormGroup;

  contact_person: FormArray;
  trophies: FormArray;
  top_signings: FormArray;
  top_players: FormArray;
  position: FormArray;

  samplePositionArray = [
    {
      name: 'Volvo',
      value: 'volvo'
    },
    {
      name: 'Audi',
      value: 'audi'
    },
    {
      name: 'Mercedes',
      value: 'mercedes'
    }
  ];
  strongFootArray = [
    {
      name: 'Left',
      value: 'left'
    },
    {
      name: 'Right',
      value: 'right'
    }
  ];
  sampleCountryArray = [
    {
      name: 'India',
      value: 'india'
    },
    {
      name: 'UK',
      value: 'uk'
    },
    {
      name: 'USA',
      value: 'usa'
    },
    {
      name: 'Australia',
      value: 'australia'
    }
  ];
  sampleStateArray = [
    {
      name: 'Delhi',
      value: 'delhi'
    },
    {
      name: 'Mumbai',
      value: 'mumbai'
    },
    {
      name: 'U.P',
      value: 'up'
    },
    {
      name: 'M.P',
      value: 'mp'
    }
  ];
  designationArray = [
    {
      name: 'Volvo',
      value: 'volvo'
    },
    {
      name: 'Saab',
      value: 'saab'
    },
    {
      name: 'Mercedes',
      value: 'mercedes'
    },
    {
      name: 'Audi',
      value: 'audi'
    }
  ];
  leagueArray = [
    {
      name: 'Hero Indian Super League',
      value: 'Hero Indian Super League'
    },
    {
      name: 'Hero Indian women’s League',
      value: 'Hero Indian women’s League'
    },
    {
      name: 'Hero I-League',
      value: 'Hero I-League'
    },
    {
      name: 'Hero 2nd Division',
      value: 'Hero 2nd Division'
    },
    {
      name: 'Hero Elite League',
      value: 'Hero Elite League'
    },
    {
      name: 'Hero Junior League',
      value: 'Hero Junior League'
    },
    {
      name: 'Hero Sub - Junior League',
      value: 'Hero Sub - Junior League'
    },
    {
      name: 'Hero Super Cup',
      value: 'Hero Super Cup'
    },
    {
      name: 'Hero Gold Cup',
      value: 'Hero Gold Cup'
    },
    {
      name: 'Second Division League',
      value: 'Second Division League'
    },
    {
      name: 'Golden Baby Leagues',
      value: 'Golden Baby Leagues'
    },
    {
      name: 'Hero Senior NFC',
      value: 'Hero Senior NFC'
    },
    {
      name: 'Hero Senior Women NFC',
      value: 'Hero Senior Women NFC'
    },
    {
      name: 'Hero Junior NFC',
      value: 'Hero Junior NFC'
    },
    {
      name: 'Hero Junior Girl NFC',
      value: 'Hero Junior Girl NFC'
    },
    {
      name: 'Hero Sub-Junior NFC',
      value: 'Hero Sub-Junior NFC'
    },
    {
      name: 'Hero Sub-Junior Girl’s NFC',
      value: 'Hero Sub-Junior Girl’s NFC'
    }
  ];
  sampleCityArray = [
    {
      name: 'City1',
      value: 'city1'
    },
    {
      name: 'City2',
      value: 'city2'
    },
    {
      name: 'City3',
      value: 'city3'
    },
    {
      name: 'City4',
      value: 'city4'
    }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {
    this.createForm();
    this.setCategoryValidators();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
  }

  ngOnInit() {
    this.populateView();
  }

  selectTab(tabName: string) {
    this.player_type = tabName;
    this.setCategoryValidators();
    console.log('player_type', this.player_type);
  }

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

  populateView() {
    this._authenticationService.getProfileDetails().subscribe(
      response => {
        console.log('data', response);
        this.profile = response.data;
        this.populateFormFields();

        if (
          this.profile.member_type === 'club' ||
          this.profile.member_type === 'academy'
        ) {
          this.populateDynamicContact();
          this.populateDynamicTrophy();
          this.populateDynamicTopSigning();
          this.populateDynamicTopAcademyPlayer();
        }

        if (this.profile.member_type === 'player') {
          this.populateDynamicPosition();
        }

        if (this.profile.avatar_url) {
          this.profile.avatar_url =
            this.environment.mediaUrl + this.profile.avatar_url;
        } else {
          this.profile.avatar_url =
            this.environment.mediaUrl + '/uploads/avatar/user-avatar.png';
        }

        this._toastrService.success(
          'Successful',
          'Data retrieved successfully'
        );
      },
      error => {
        console.log('error', error);
        this._toastrService.error(
          `${error.error.message}`,
          'Failed to load data'
        );
      }
    );

    this.setCategoryValidators();
  }

  resetForm() {
    this.editProfileForm.reset();
    this.createForm();
    this.setCategoryValidators();
  }

  setCategoryValidators() {
    if (this.member_type === 'player') {
      const employmentContract = this.editProfileForm.get(
        'employment_contract'
      );
      const aadhar = this.editProfileForm.get('aadhar');
      const height_feet = this.editProfileForm.get('height_feet');
      const height_inches = this.editProfileForm.get('height_inches');
      const head_coach_phone = this.editProfileForm.get('head_coach_phone');
      const head_coach_email = this.editProfileForm.get('head_coach_email');

      this.editProfileForm
        .get('associated_club')
        .valueChanges.subscribe(associated_club => {
          if (associated_club === 'yes') {
            head_coach_phone.setValidators([
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern(/^\d+$/)
            ]);
            head_coach_email.setValidators([
              Validators.required,
              Validators.email
            ]);
          } else if (associated_club === 'no') {
            head_coach_phone.setValue(''); // setValue use to clear any input provided
            head_coach_email.setValue('');
            head_coach_phone.setValidators([
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern(/^\d+$/)
            ]);
            head_coach_email.setValidators([Validators.email]);
          }
          head_coach_phone.updateValueAndValidity();
          head_coach_email.updateValueAndValidity();
        });

      this.editProfileForm
        .get('player_type')
        .valueChanges.subscribe(player_type => {
          // if(!this.profile.documents && this.profile.documents[0])
          aadhar.setValidators([Validators.required, requiredFileDocument]);

          if (player_type === 'professional') {
            employmentContract.setValidators([
              Validators.required,
              requiredFileDocument
            ]);
          }
          if (player_type === 'amateur' || player_type === 'grassroot') {
            employmentContract.setValidators(null);
          }

          if (player_type === 'amateur' || player_type === 'professional') {
            height_feet.setValidators([
              Validators.required,
              Validators.pattern(/^\d+$/)
            ]);
            height_inches.setValidators([
              Validators.required,
              Validators.pattern(/^\d+$/)
            ]);
          }

          if (player_type === 'grassroot') {
            height_feet.setValidators([Validators.pattern(/^\d+$/)]);
            height_inches.setValidators([Validators.pattern(/^\d+$/)]);
          }

          height_feet.updateValueAndValidity();
          height_inches.updateValueAndValidity();
          aadhar.updateValueAndValidity();
          employmentContract.updateValueAndValidity();
        });
    } else if (this.member_type === 'club' || this.member_type === 'academy') {
      const address = this.editProfileForm.get('address');
      const pincode = this.editProfileForm.get('pincode');
      const trophies = this.editProfileForm.get('trophies');

      if (this.member_type === 'club') {
        trophies.setValidators(null);
        address.setValidators(null);
        pincode.setValidators([Validators.pattern(/^\d+$/)]);
      }

      if (this.member_type === 'academy') {
        trophies.setValidators([Validators.required]);
        address.setValidators([Validators.required]);
        pincode.setValidators([
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]);
      }

      trophies.updateValueAndValidity();
      address.updateValueAndValidity();
      pincode.updateValueAndValidity();
    }
  }

  editProfile() {
    let requestData = this.toFormData(this.editProfileForm.value);

    if (this.member_type === 'player') {
      if (this.aadhar) requestData.set('aadhar', this.aadhar);
      if (this.player_type === 'professional') {
        if (this.employment_contract)
          requestData.set('employment_contract', this.employment_contract);
      }
      requestData.set(
        'position',
        JSON.stringify(this.editProfileForm.get('position').value)
      );
      requestData.set('dob', this.editProfileForm.get('dob').value);
    } else if (this.member_type === 'club' || this.member_type === 'academy') {
      if (this.member_type === 'club') requestData.set('aiff', this.aiff);
      else requestData.set('document', this.document);

      requestData.set(
        'contact_person',
        JSON.stringify(this.editProfileForm.get('contact_person').value)
      );
      requestData.set(
        'trophies',
        JSON.stringify(this.editProfileForm.get('trophies').value)
      );
      if (this.member_type === 'club') {
        requestData.set(
          'top_signings',
          JSON.stringify(this.editProfileForm.get('top_signings').value)
        );
      }
      if (this.member_type === 'academy') {
        requestData.set(
          'top_players',
          JSON.stringify(this.editProfileForm.get('top_players').value)
        );
      }
    }

    this._authenticationService.editProfile(requestData).subscribe(
      res => {
        console.log('response', res);
        this._toastrService.success(
          'Successful',
          'Profile updated successfully'
        );
        this._router.navigate(['/profile']);
      },
      err => {
        console.log('err', err);
        this._toastrService.error(
          'Error',
          'An error occured while trying to update profile'
        );
      }
    );
  }

  uploadAadhar(files: FileList) {
    this.aadhar = files[0];
  }

  uploadAiff(files: FileList) {
    this.aiff = files[0];
  }

  uploadDocument(files: FileList) {
    this.document = files[0];
  }

  uploadAvatar(files: FileList) {
    this.avatar = files[0];
    const requestData = new FormData();
    requestData.set('avatar', this.avatar);

    if (this.aboutForm.valid) {
      this._authenticationService.updateBio(requestData).subscribe(
        res => {
          console.log('response', res);
          if (res.data.avatar_url) {
            this.profile.avatar_url =
              this.environment.mediaUrl + res.data.avatar_url;
          }
          localStorage.setItem(
            'avatar_url',
            this.environment.mediaUrl + res.data.avatar_url
          );
          this.header.avatar_url = localStorage.getItem('avatar_url');
          this._toastrService.success(
            'Successful',
            'Avatar updated successfully'
          );
        },
        err => {
          console.log('err', err);
          this._toastrService.error(
            'Error',
            'An error occured while updating avatar'
          );
        }
      );
    }
  }

  uploadEmploymentContract(files: FileList) {
    this.employment_contract = files[0];
  }

  removeAvatar() {
    this._authenticationService.removeAvatar().subscribe(
      res => {
        console.log('response', res);
        if (res.data.avatar_url) {
          this.profile.avatar_url =
            this.environment.mediaUrl + res.data.avatar_url;
        }
        localStorage.setItem(
          'avatar_url',
          this.environment.mediaUrl + res.data.avatar_url
        );
        this.header.avatar_url = localStorage.getItem('avatar_url');
        this._toastrService.success(
          'Successful',
          'Avatar removed successfully'
        );
      },
      err => {
        console.log('err', err);
        this._toastrService.error(
          'Error',
          'An error occured while removing avatar'
        );
      }
    );
  }

  socialProfile() {
    this._authenticationService
      .updateBio(this.socialProfileForm.value)
      .subscribe(
        res => {
          console.log('response', res);
          this._toastrService.success(
            'Successful',
            'Social profiles updated successfully'
          );
        },
        err => {
          console.log('err', err);
          this._toastrService.error(
            'Error',
            'An error occured while updating social profiles'
          );
        }
      );
  }
  about() {
    let requestData = this.toFormData(this.aboutForm.value);
    if (this.avatar) requestData.set('avatar', this.avatar);

    this._authenticationService.updateBio(requestData).subscribe(
      res => {
        console.log('response', res);
        this._toastrService.success('Successful', 'Bio updated successfully');
      },
      err => {
        console.log('err', err);
        this._toastrService.error(
          'Error',
          'An error occured while updating bio'
        );
      }
    );
  }

  createForm() {
    this.aboutForm = this._formBuilder.group({
      avatar: ['', [requiredFileAvatar]],
      bio: ['', [Validators.maxLength(1000)]]
    });

    this.socialProfileForm = this._formBuilder.group({
      instagram: [''],
      facebook: [''],
      twitter: [''],
      youtube: ['']
    });

    if (this.member_type === 'player') {
      this.editProfileForm = this._formBuilder.group({
        // personal_details
        player_type: ['', [Validators.required]],
        first_name: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
          ]
        ],
        last_name: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
          ]
        ],
        dob: ['', [Validators.required]], //2020-04-14T18:30:00.000Z"
        height_feet: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        height_inches: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        weight: ['', [Validators.pattern(/^\d+(\.\d)?$/)]],
        country: ['', [Validators.required]], // country or nationality
        state: ['', [Validators.required]],
        city: ['', [Validators.required]], //city
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ]
        ],
        school: ['', []], //institute.school
        university: [''], //institute.univeristy
        college: [''], //institute.college
        aadhar: ['', []],
        employment_contract: ['', []],
        // // professional_details
        position: this._formBuilder.array([]),
        strong_foot: ['', []],
        associated_club: ['', []],
        weak_foot: ['', []],
        head_coach_phone: [
          '',
          [
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ]
        ],
        head_coach_email: ['', [Validators.email]],
        former_club: ['', []]
      });
    } else if (this.member_type === 'club') {
      this.editProfileForm = this._formBuilder.group({
        // personal_details
        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
          ]
        ],
        short_name: ['', []],
        founded_in: [
          '',
          [
            Validators.required,
            Validators.maxLength(4),
            Validators.pattern(/^\d+$/)
          ]
        ],
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', []],
        pincode: ['', []],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ]
        ],
        stadium_name: ['', []],
        league: ['', [Validators.required]],
        league_other: ['', [Validators.required]],
        contact_person: this._formBuilder.array([]),
        trophies: this._formBuilder.array([]),
        top_signings: this._formBuilder.array([], []),
        associated_players: [
          '',
          [Validators.required, Validators.pattern(/^\d+$/)]
        ],
        aiff: ['', [requiredFileDocument]]
        // onclick upload document [aiff]
      });
    } else if (this.member_type === 'academy') {
      this.editProfileForm = this._formBuilder.group({
        // personal_details
        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.pattern(/^(?:[0-9]+[ a-zA-Z]|[a-zA-Z])[a-zA-Z0-9 ]*$/)
          ]
        ],
        short_name: ['', []],
        founded_in: [
          '',
          [
            Validators.required,
            Validators.maxLength(4),
            Validators.pattern(/^\d+$/)
          ]
        ],
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^\d+$/)
          ]
        ],
        stadium_name: ['', []],
        league: ['', [Validators.required]],
        league_other: ['', [Validators.required]],
        document_type: ['', []],
        contact_person: this._formBuilder.array([], []),
        trophies: this._formBuilder.array([], []),
        top_players: this._formBuilder.array([], []),
        associated_players: [
          '',
          [Validators.required, Validators.pattern(/^\d+$/)]
        ],
        document: ['', [requiredFileDocument]]
        //onclick upload documenet aiff / pan card/tin / coi
      });
    }
  }

  populateFormFields() {
    this.editProfileForm.valueChanges.subscribe(val => {
      this.player_type = val.player_type;
    });

    if (this.profile.member_type === 'player') {
      if (
        this.profile.club_academy_details &&
        this.profile.club_academy_details.head_coach_phone
      )
        this.editProfileForm.get('associated_club').setValue('yes');
      else this.editProfileForm.get('associated_club').setValue('no');
    }

    this.editProfileForm.patchValue({
      player_type: this.profile.player_type ? this.profile.player_type : '',
      name: this.profile.name,
      short_name: this.profile.short_name ? this.profile.short_name : '',
      founded_in: this.profile.founded_in,
      address: this.profile.address ? this.profile.address.full_address : '',
      pincode: this.profile.address ? this.profile.address.pincode : '',
      first_name: this.profile.first_name ? this.profile.first_name : '',
      last_name: this.profile.last_name ? this.profile.last_name : '',
      height_feet:
        this.profile.height && this.profile.height.feet
          ? this.profile.height.feet
          : '',
      height_inches:
        this.profile.height && this.profile.height.inches
          ? this.profile.height.inches
          : '',
      weight: this.profile.weight ? this.profile.weight : '',
      dob: this.profile.dob ? new Date(this.profile.dob) : '',
      phone: this.profile.phone ? this.profile.phone : '',
      country: this.profile.country ? this.profile.country : '',
      state: this.profile.state ? this.profile.state : '',
      city: this.profile.city ? this.profile.city : '',
      stadium_name: this.profile.stadium_name ? this.profile.stadium_name : '',
      league: this.profile.league ? this.profile.league : '',
      league_other: this.profile.league_other,
      strong_foot: this.profile.strong_foot ? this.profile.strong_foot : '',
      weak_foot: this.profile.weak_foot ? this.profile.weak_foot : '',
      head_coach_phone: this.profile.club_academy_details
        ? this.profile.club_academy_details.head_coach_phone
        : '',
      head_coach_email: this.profile.club_academy_details
        ? this.profile.club_academy_details.head_coach_email
        : '',
      contact_person: this.profile.contact_person,
      trophies: this.profile.trophies,
      associated_players: this.profile.associated_players,
      former_club: this.profile.former_club ? this.profile.former_club : '',
      school:
        this.profile.institute && this.profile.institute.school
          ? this.profile.institute.school
          : '',
      university:
        this.profile.institute && this.profile.institute.university
          ? this.profile.institute.university
          : '',
      college:
        this.profile.institute && this.profile.institute.college
          ? this.profile.institute.college
          : '',
      document_type:
        this.profile.documents && this.profile.documents[0]
          ? this.profile.documents[0].type
          : ''
    });

    if (this.profile.social_profiles) {
      this.socialProfileForm.patchValue({
        instagram: this.profile.social_profiles.instagram,
        facebook: this.profile.social_profiles.facebook,
        twitter: this.profile.social_profiles.twitter,
        youtube: this.profile.social_profiles.youtube
      });
    }

    if (this.profile.bio) {
      this.aboutForm.patchValue({
        bio: this.profile.bio
      });
    }
  }

  populateDynamicContact() {
    if (this.profile.contact_person.length !== 0) {
      for (let i = 0; i < this.profile.contact_person.length; i++) {
        this.addContactPerson(this.profile.contact_person[i]);
      }
    }
  }

  populateDynamicTrophy() {
    if (this.profile.trophies.length !== 0) {
      for (let i = 0; i < this.profile.trophies.length; i++) {
        this.addTrophy(this.profile.trophies[i]);
      }
    }
  }

  populateDynamicTopSigning() {
    if (this.profile.top_signings.length !== 0) {
      for (let i = 0; i < this.profile.top_signings.length; i++) {
        this.addTopSigning(this.profile.top_signings[i]);
      }
    }
  }
  populateDynamicTopAcademyPlayer() {
    if (this.profile.top_players.length !== 0) {
      for (let i = 0; i < this.profile.top_players.length; i++) {
        this.addTopAcademyPlayer(this.profile.top_players[i]);
      }
    }
  }

  populateDynamicPosition() {
    for (let i = 0; i < 3; i++) {
      this.preparePosition(this.profile.position[i], i);
    }
  }

  addContactPerson(data?: contactPersonObject) {
    this.contact_person = this.editProfileForm.get(
      'contact_person'
    ) as FormArray;

    if (data !== undefined) {
      this.contact_person.push(
        this._formBuilder.group({
          designation: [data.designation, [Validators.required]],
          name: [data.name, [Validators.required]],
          email: [data.email, [Validators.required, Validators.email]],
          phone_number: [
            data.phone_number,
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern(/^\d+$/)
            ]
          ]
        })
      );
    } else {
      this.contact_person.push(
        this._formBuilder.group({
          designation: ['', [Validators.required]],
          name: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          phone_number: [
            '',
            [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              Validators.pattern(/^\d+$/)
            ]
          ]
        })
      );
    }
  }

  removeContactPerson(i: number) {
    this.contact_person.removeAt(i);
  }

  addTrophy(data?: trophyObject) {
    this.trophies = this.editProfileForm.get('trophies') as FormArray;

    if (data !== undefined) {
      this.trophies.push(
        this._formBuilder.group({
          name: [data.name, [Validators.required]],
          year: [
            data.year,
            [
              Validators.required,
              Validators.maxLength(4),
              Validators.pattern(/^\d+$/)
            ]
          ],
          position: [data.position, [Validators.required]]
        })
      );
    } else {
      this.trophies.push(
        this._formBuilder.group({
          name: ['', [Validators.required]],
          year: [
            '',
            [
              Validators.required,
              Validators.maxLength(4),
              Validators.pattern(/^\d+$/)
            ]
          ],
          position: ['', [Validators.required]]
        })
      );
    }
  }

  removeTrophy(i: number) {
    this.trophies.removeAt(i);
  }

  addTopSigning(data?: topSigningObject) {
    this.top_signings = this.editProfileForm.get('top_signings') as FormArray;

    if (data !== undefined) {
      this.top_signings.push(
        this._formBuilder.group({
          name: [data.name, []]
        })
      );
    } else {
      this.top_signings.push(
        this._formBuilder.group({
          name: ['', []]
        })
      );
    }
  }

  removeTopSigning(i: number) {
    this.top_signings.removeAt(i);
  }

  addTopAcademyPlayer(data?: topAcademyPlayerObject) {
    this.top_players = this.editProfileForm.get('top_players') as FormArray;

    if (data !== undefined) {
      this.top_players.push(
        this._formBuilder.group({
          name: [data.name, []]
        })
      );
    } else {
      this.top_players.push(
        this._formBuilder.group({
          name: ['', []]
        })
      );
    }
  }

  removeTopAcademyPlayer(i: number) {
    this.top_players.removeAt(i);
  }

  preparePosition(data?: positionObject, index?: number) {
    this.position = this.editProfileForm.get('position') as FormArray;

    if (data !== undefined) {
      this.position.push(
        this._formBuilder.group({
          priority: index + 1,
          name: [data.name, []]
        })
      );
    } else {
      this.position.push(
        this._formBuilder.group({
          priority: index + 1,
          name: ['', []]
        })
      );
    }
  }
}
