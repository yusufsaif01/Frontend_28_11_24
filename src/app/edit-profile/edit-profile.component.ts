import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface trophyObject {
  trophy_name: string;
  trophy_year: string;
  trophy_position: string;
}

interface contactPersonObject {
  club_contact_designation: string;
  club_contact_name: string;
  club_contact_email: string;
  club_contact_phone_number: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  // member_type = 'academy';
  // player_type = "grassroot";
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
  aadharformContent: any;
  documentContent: any;
  Avatar: any;
  dateVal = new Date();

  contact_person: FormArray;
  trophies: FormArray;
  top_signings: FormArray;
  // sampleContactArray = [
  //   {
  //     club_contact_designation: 'saab',
  //     club_contact_name: 'pushpam',
  //     club_contact_email: 'p@p.com',
  //     club_contact_phone: '12819793719791'
  //   },
  //   {
  //     club_contact_designation: 'saab',
  //     club_contact_name: 'pushpam1',
  //     club_contact_email: 'p@p.com1',
  //     club_contact_phone: '128119791'
  //   }
  // ];
  // sampleTrophyArray = [
  //   {
  //     trophy_name: 'T1',
  //     trophy_years: '2018',
  //     trophy_position: 'First'
  //   },
  //   {
  //     trophy_name: 'T2',
  //     trophy_years: '2019',
  //     trophy_position: 'First'
  //   }
  // ];
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

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _toastrService: ToastrService
  ) {
    this.createForm();
    // this.setUserCategoryValidators()
  }

  ngOnInit() {
    this.populateView();
  }

  selectTab(tabName: string) {
    // this.editProfileForm.reset();
    // this.createForm()
    this.player_type = tabName;
    // this.createForm();
    this.setPlayerCategoryValidators();
    console.log('player_type', this.player_type);
  }

  isFocused(form: FormGroup, field: string) {
    const { invalid, touched } = form.get(field);
    return invalid && touched;
  }

  isRequired(form: FormGroup, field: string) {
    const { required } = form.get(field).errors;
    return required;
  }

  // toFormData<T>(formValue: T) {
  //   const formData = new FormData();
  //   for (const key of Object.keys(formValue)) {
  //     const value = formValue[key];
  //     if (!value.length) {
  //       continue;
  //     }
  //     formData.append(key, value);
  //   }
  //   return formData;
  // }

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
  }

  setPlayerCategoryValidators() {
    if (this.member_type === 'player') {
      // const univeristyNameControl = this.editProfileForm.get(
      //   'player_current_university_name'
      // );
      // const collegeNameControl = this.editProfileForm.get(
      //   'player_current_college_name'
      // );
      // const employmentContract = this.editProfileForm.get(
      //   'player_employment_contract'
      // );
      // this.editProfileForm
      //   .get('player_type')
      //   .valueChanges.subscribe(player_type => {
      //     if (player_type === 'professional') {
      //       univeristyNameControl.setValidators([Validators.required]);
      //       collegeNameControl.setValidators([Validators.required]);
      //       // employmentContract.setValidators([Validators.required]);
      //     }
      //     if (player_type === 'amateur') {
      //       univeristyNameControl.setValidators(null);
      //       collegeNameControl.setValidators([Validators.required]);
      //       // employmentContract.setValidators(null);
      //     }
      //     if (player_type === 'grassroot') {
      //       univeristyNameControl.setValidators(null);
      //       collegeNameControl.setValidators(null);
      //       // employmentContract.setValidators(null);
      //     }
      //     univeristyNameControl.updateValueAndValidity();
      //     collegeNameControl.updateValueAndValidity();
      //     // employmentContract.updateValueAndValidity();
      //   });
    }
    // else if(this.member_type==='club' || this.member_type==='academy'){
    //   const univeristyNameControl  = this.editProfileForm.get('player_current_university_name');

    //   this.editProfileForm.get('club_document').valueChanges
    //   .subscribe(member_type => {

    //     if (member_type === 'club') {
    //       univeristyNameControl.setValidators([Validators.required]);
    //       collegeNameControl.setValidators([Validators.required]);
    //       // employmentContract.setValidators([Validators.required]);
    //     }

    //     if (member_type === 'academy') {
    //       univeristyNameControl.setValidators(null);
    //       collegeNameControl.setValidators([Validators.required]);
    //       // employmentContract.setValidators(null);

    //     univeristyNameControl.updateValueAndValidity();
    //     collegeNameControl.updateValueAndValidity();
    //     // employmentContract.updateValueAndValidity();
    //   });
  }

  editProfile() {
    if (this.member_type === 'player') {
      // console.log('data player', formData1);
    } else if (this.member_type === 'club') {
      // console.log('data club', formData1);
    } else if (this.member_type === 'academy') {
      // formData1.append('document_type', document_type);
    }
    this._authenticationService
      .editProfile(this.editProfileForm.value)
      .subscribe(
        res => {
          console.log('response', res);
          this._toastrService.success(
            'Successful',
            'Profile updated successfully'
          );
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

  uploadAadhar(event: any) {
    console.log('##################', event.target.files);
    this.aadharformContent = event.target.files[0];
  }

  uploadDocument(event: any) {
    console.log('##################', event.target.files);
    let file = event.target.files[0];
    this.editProfileForm.get('document').setValue(file);
  }

  uploadAvatar(event: any) {
    console.log('##################', event.target.files);
    this.Avatar = event.target.files[0];
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
    this._authenticationService.updateBio(this.aboutForm.value).subscribe(
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
      bio: ['']
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
        player_type: [this.player_type, [Validators.required]],
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        dob: ['', [Validators.required]], //2020-04-14T18:30:00.000Z"
        height_feet: ['', [Validators.required]],
        height_inches: ['', [Validators.required]], //height
        weight: ['', [Validators.required]],
        country: ['', [Validators.required]], //country
        state: ['', [Validators.required]],
        city: ['', [Validators.required]], //city
        phone: ['', [Validators.required]],
        school: ['', [Validators.required]], //institute.school
        university: [''], //institute.univeristy
        college: [''], //institute.college
        // player_upload_aadhar : ['',[ ]],
        player_employment_contract: ['', []],
        // // professional_details
        position1: ['', []],
        position2: ['', []],
        position3: ['', []],
        strong_foot: ['', []],
        associated_club: ['', []],
        weak_foot: ['', []],
        head_coach_phone: ['', []],
        head_coach_email: ['', []],
        player_former_club: ['', []]
      });
    } else if (this.member_type === 'club') {
      this.editProfileForm = this._formBuilder.group({
        // personal_details
        name: ['', [Validators.required]],
        short_name: ['', [Validators.required]],
        founded_in: ['', [Validators.required]],
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(13)
          ]
        ],
        stadium_name: ['', [Validators.required]],
        contact_person: this._formBuilder.array([]),
        trophies: this._formBuilder.array([]),
        top_signings: this._formBuilder.array([]),
        associated_players: ['', []],
        document: ['']
        // onclick upload document [aiff]
      });
    } else if (this.member_type === 'academy') {
      this.editProfileForm = this._formBuilder.group({
        // personal_details
        name: ['', [Validators.required]],
        short_name: ['', [Validators.required]],
        founded_in: ['', [Validators.required]],
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(13)
          ]
        ],
        stadium_name: ['', [Validators.required]],
        document_type: ['', [Validators.required]],
        contact_person: this._formBuilder.array([]),
        trophies: this._formBuilder.array([]),
        top_signings: this._formBuilder.array([]),
        associated_players: ['', []],
        document: ['']
        //onclick upload documenet aiff / pan card/tin / coi
      });
    }
  }

  populateFormFields() {
    this.editProfileForm.valueChanges.subscribe(val => {
      this.player_type = val.player_type;
    });

    this.editProfileForm.patchValue({
      player_type: this.profile.player_type,
      name: this.profile.name,
      short_name: this.profile.short_name,
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
      // player_current_school_name: this.profile.institiute ? this.profile.institiute.school_name : '',
      country: this.profile.country,
      state: this.profile.state ? this.profile.state : '',
      stadium_name: this.profile.stadium_name,
      position1:
        this.profile.position && this.profile.position[0]
          ? this.profile.position[0].name
          : '',
      position2:
        this.profile.position && this.profile.position[1]
          ? this.profile.position[1].name
          : '',
      position3:
        this.profile.position && this.profile.position[2]
          ? this.profile.position[2].name
          : '',
      strong_foot: this.profile.strong_foot,
      weak_foot: this.profile.weak_foot,
      head_coach_phone:
        this.profile.club_academy_details &&
        this.profile.club_academy_details[0].head_coach_phone
          ? this.profile.club_academy_details[0].head_coach_phone
          : '',
      head_coach_email:
        this.profile.club_academy_details &&
        this.profile.club_academy_details[0]
          ? this.profile.club_academy_details[0].head_coach_email
          : '',
      contact_person: this.profile.contact_person,
      trophies: this.profile.trophies,
      associated_players: this.profile.associated_players,
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

  addContactPerson(data?: contactPersonObject) {
    this.contact_person = this.editProfileForm.get(
      'contact_person'
    ) as FormArray;

    if (data !== undefined) {
      this.contact_person.push(
        this._formBuilder.group({
          club_contact_designation: [data.club_contact_designation, []],
          club_contact_name: [data.club_contact_name, []],
          club_contact_email: [data.club_contact_email, []],
          club_contact_phone_number: [data.club_contact_phone_number, []]
        })
      );
    } else {
      this.contact_person.push(
        this._formBuilder.group({
          club_contact_designation: ['', []],
          club_contact_name: ['', []],
          club_contact_email: ['', []],
          club_contact_phone_number: ['', []]
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
          trophy_name: [data.trophy_name, []],
          trophy_year: [data.trophy_year, []],
          trophy_position: [data.trophy_position, []]
        })
      );
    } else {
      this.trophies.push(
        this._formBuilder.group({
          trophy_name: ['', []],
          trophy_year: ['', []],
          trophy_position: ['', []]
        })
      );
    }
  }

  removeTrophy(i: number) {
    this.trophies.removeAt(i);
  }

  addTopSigning(data: any) {
    this.top_signings = this.editProfileForm.get('top_signings') as FormArray;

    if (data !== undefined) {
      this.top_signings.push(
        this._formBuilder.group({
          top_signings: [data, []]
        })
      );
    } else {
      this.top_signings.push(
        this._formBuilder.group({
          top_signings: ['', []]
        })
      );
    }
  }

  removeTopSigning(i: number) {
    this.top_signings.removeAt(i);
  }
}
