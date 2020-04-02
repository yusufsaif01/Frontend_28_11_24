import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';

interface trophyObject {
  name: string;
  years: string;
  position: string;
}

interface contactPersonObject {
  designation: string;
  name: string;
  email: string;
  phone: string;
}

interface topSigningObject {
  top_signings: string;
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
  player_type = localStorage.getItem('player_type') || 'grassroot';
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

  club_contact_persons: FormArray;
  club_trophies: FormArray;
  club_top_signings: FormArray;
  sampleContactArray = [
    {
      designation: 'Saab',
      name: 'pushpam',
      email: 'p@p.com',
      phone: '12819793719791'
    },
    {
      designation: 'Saab',
      name: 'pushpam1',
      email: 'p@p.com1',
      phone: '128119791'
    }
  ];
  sampleTrophyArray = [
    {
      name: 'T1',
      years: '2018',
      position: 'First'
    },
    {
      name: 'T2',
      years: '2019',
      position: 'First'
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
    this.editProfileForm.reset();
    // this.createForm()
    this.player_type = tabName;
    this.createForm();
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

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (!value.length) {
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
        this.populateDynamicContact();
        this.populateDynamicTrophy();
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
      const univeristyNameControl = this.editProfileForm.get(
        'player_current_university_name'
      );
      const collegeNameControl = this.editProfileForm.get(
        'player_current_college_name'
      );
      const employmentContract = this.editProfileForm.get(
        'player_employment_contract'
      );

      this.editProfileForm
        .get('player_type')
        .valueChanges.subscribe(player_type => {
          if (player_type === 'professional') {
            univeristyNameControl.setValidators([Validators.required]);
            collegeNameControl.setValidators([Validators.required]);
            // employmentContract.setValidators([Validators.required]);
          }

          if (player_type === 'amateur') {
            univeristyNameControl.setValidators(null);
            collegeNameControl.setValidators([Validators.required]);
            // employmentContract.setValidators(null);
          }
          if (player_type === 'grassroot') {
            univeristyNameControl.setValidators(null);
            collegeNameControl.setValidators(null);
            // employmentContract.setValidators(null);
          }

          univeristyNameControl.updateValueAndValidity();
          collegeNameControl.updateValueAndValidity();
          // employmentContract.updateValueAndValidity();
        });
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
    // console.log("form_data",this.editProfileForm.value)

    const formData = new FormData();
    let formData1: any;
    if (this.member_type === 'player') {
      //player
      let {
        player_type,
        player_first_name,
        player_last_name,
        player_dob,
        player_height_foot,
        player_height_inches,
        player_weight,
        player_nationality,
        player_state,
        player_current_city,
        // player_email,
        player_phone,
        player_current_school_name,
        player_current_university_name,
        player_current_college_name,
        // player_upload_aadhar,
        player_employment_contract,
        player_position1,
        player_position2,
        player_position3,
        player_strong_foot,
        player_associated_club,
        player_weak_foot,
        player_head_coach_phone_number,
        player_head_coach_email_number,
        player_former_club
      } = this.editProfileForm.value;
      // form_data['player_type']= player_type
      // form_data['first_name']= player_first_name
      // form_data['last_name'] = player_last_name
      // form_data['dob']=player_dob
      // form_data['height'] = player_height_foot
      // form_data['weight'] = player_weight
      // form_data['country'] = player_nationality
      // form_data['state'] = player_state
      // form_data['city'] = player_current_city
      // form_data['phone'] = player_phone
      // form_data['form_data'] = this.aadharformContent

      // if (form_data['form_data'] === null) {
      //   return alert('Please upload correct file !!');
      // }

      let institute: any = {
        school: player_current_school_name,
        college: player_current_college_name,
        university: player_current_university_name
      };
      let head_coach: any = {
        head_coach_email: player_head_coach_email_number,
        head_coach_phone: player_head_coach_phone_number
      };
      let player_height =
        player_height_foot + 'ft' + player_height_inches + 'in';
      formData.append(
        'aadhar',
        this.aadharformContent,
        this.aadharformContent.name
      );
      formData.append('player_type', player_type);
      formData.append('first_name', player_first_name);
      formData.append('last_name', player_last_name);
      formData.append('dob', player_dob);
      formData.append('height', player_height);
      formData.append('weight', player_weight);
      formData.append('state', player_state);
      formData.append('nationality', player_nationality);
      formData.append('phone', player_phone);
      formData.append('city', player_current_city);
      formData.append('institute', institute);
      formData.append('weak_foot', player_weak_foot);
      formData.append('former_club', player_former_club);
      console.log('data', formData);
    } else if (this.member_type === 'club') {
      formData1 = this.toFormData(this.editProfileForm.value);
      formData1.append('aiff', this.documentContent, this.documentContent.name);
      // let {
      //   name ,
      //   short_name ,
      //   founded_in ,
      //   country ,
      //   city ,
      //   address ,
      //   pincode ,
      //   phone ,
      //   stadium_name ,
      //   owner,
      //   manager ,
      // } = this.editProfileForm.value;

      // formData.append('name ',name );
      // formData.append('short_name ',  short_name );
      // formData.append('founded_in ',  founded_in );
      // formData.append('country ', country );
      // formData.append('city ', city );
      // formData.append('address ', address );
      // formData.append('pincode ',pincode )
      // formData.append('phone ',phone );
      // formData.append('stadium_name ',stadium_name );
      // formData.append('owner',owner);
      // formData.append('manager ',manager );
      // formData.append('aiff',this.documentContent,this.documentContent.name);
    } else if (this.member_type === 'academy') {
      formData1 = this.toFormData(this.editProfileForm.value);
      formData1.append(
        'document',
        this.documentContent,
        this.documentContent.name
      );
      // let {
      //   name ,
      //   short_name ,
      //   founded_in ,
      //   country ,
      //   city ,
      //   address ,
      //   pincode ,
      //   phone ,
      //   stadium_name ,
      //   owner,
      //   manager ,
      //   document_type
      // } = this.editProfileForm.value;

      // formData.append('name ',name );
      // formData.append('short_name ',  short_name );
      // formData.append('founded_in ',  founded_in );
      // formData.append('country ', country );
      // formData.append('city ', city );
      // formData.append('address ', address );
      // formData.append('pincode ',pincode )
      // formData.append('phone ',phone );
      // formData.append('stadium_name ',stadium_name );
      // formData.append('owner',owner);
      // formData.append('manager ',manager );
      // formData.append('document_type',document_type);
      // formData.append('document',this.documentContent,this.documentContent.name);
    }
    console.log('################formdata1', formData1['manager']);
    for (let pair of formData1.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    let token = localStorage.getItem('token');
    this._authenticationService.editProfile(formData1, token).subscribe(
      res => {
        console.log('response', res);
      },
      err => {
        console.log('err', err);
      }
    );
  }

  uploadAadhar(event: any) {
    console.log('##################', event.target.files);
    this.aadharformContent = event.target.files[0];
  }

  uploadDocument(event: any) {
    console.log('##################', event.target.files);
    this.documentContent = event.target.files[0];
  }

  uploadAvatar(event: any) {
    console.log('##################', event.target.files);
    this.Avatar = event.target.files[0];
  }

  socialProfile() {
    let token = localStorage.getItem('token');
    this._authenticationService
      .updateBio(this.socialProfileForm.value, token)
      .subscribe(
        res => {
          console.log('response', res);
        },
        err => {
          console.log('err', err);
        }
      );
  }
  about() {
    let formData1: any = this.toFormData(this.aboutForm.value);
    formData1.append('avatar', this.Avatar, this.Avatar.name);
    for (let pair of formData1.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    let token = localStorage.getItem('token');
    this._authenticationService.updateBio(formData1, token).subscribe(
      res => {
        console.log('response', res);
      },
      err => {
        console.log('err', err);
      }
    );
  }

  createForm() {
    this.aboutForm = this._formBuilder.group({
      about: [''],
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
        player_first_name: ['', [Validators.required]],
        player_last_name: ['', [Validators.required]],
        player_dob: ['', [Validators.required]], //2020-04-14T18:30:00.000Z"
        player_height_foot: ['', [Validators.required]], //height
        player_height_inches: ['', [Validators.required]],
        player_weight: ['', [Validators.required]],
        player_nationality: ['', [Validators.required]], //country
        player_state: ['', [Validators.required]],
        player_current_city: ['', [Validators.required]], //city
        player_phone: ['', [Validators.required]],
        player_current_school_name: ['', [Validators.required]], //institute.school
        player_current_university_name: [''], //institute.univeristy
        player_current_college_name: [''], //institute.college
        // player_upload_aadhar : ['',[ ]],
        player_employment_contract: ['', []],
        // // professional_details
        player_position1: ['', []],
        player_position2: ['', []],
        player_position3: ['', []],
        player_strong_foot: ['', []],
        player_associated_club: ['', []],
        player_weak_foot: ['', []],
        player_head_coach_phone_number: ['', []],
        player_head_coach_email_number: ['', []],
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
        owner: ['', [Validators.required]],
        manager: ['', [Validators.required]],
        club_contact_persons: this._formBuilder.array([]),
        club_trophies: this._formBuilder.array([]),
        club_top_signings: this._formBuilder.array([])
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
        owner: ['', [Validators.required]],
        manager: ['', [Validators.required]],
        document_type: ['aiff', [Validators.required]],
        club_contact_persons: this._formBuilder.array([]),
        club_trophies: this._formBuilder.array([]),
        club_associated_player: ['', []]
        //onclick upload documenet aiff / pan card/tin / coi
      });
    }
    // club_name : ['', [ Validators.required ]],
    // club_short_name : ['', [ Validators.required ]],
    // club_founded_in : ['', [ Validators.required ]],
    // club_country : ['', [ Validators.required ]],
    // club_city : ['', [ Validators.required ]],
    // club_address : ['', [ Validators.required ]],
    // club_pincode : ['', [ Validators.required ]],
    // // club_email : ['',],
    // club_phone : ['', [ Validators.required ]],
    // club_stadium_name : ['', [ Validators.required ]],
    // club_owner:['', [ Validators.required ]],
    // club_manager : ['', [ Validators.required ]],
    // club_document: ['', [ Validators.required ]],
    // club_aiff: ['', [ Validators.required ]],

    // professional_details
    // club_contact_designation : ['', []],
    // club_contact_name:['', []],
    // club_contact_email:['', []],
    // club_contact_phone_number:['', []],
    // club_contact_persons : this._formBuilder.array([]),
    // club_trophies : this._formBuilder.array([]),

    // club_league:['', []],
    // club_top_signings:['', []],
    // club_ass_player :['', []]
    // })
  }

  populateDynamicContact() {
    if (this.sampleContactArray.length !== 0) {
      for (let i = 0; i < this.sampleContactArray.length; i++) {
        this.addContactPerson(this.sampleContactArray[i]);
      }
    }
  }

  populateDynamicTrophy() {
    if (this.sampleTrophyArray.length !== 0) {
      for (let i = 0; i < this.sampleTrophyArray.length; i++) {
        this.addTrophy(this.sampleTrophyArray[i]);
      }
    }
  }

  populateDynamicTopSigning() {
    if (this.sampleTrophyArray.length !== 0) {
      for (let i = 0; i < this.sampleTrophyArray.length; i++) {
        this.addTrophy(this.sampleTrophyArray[i]);
      }
    }
  }

  addContactPerson(data?: contactPersonObject) {
    this.club_contact_persons = this.editProfileForm.get(
      'club_contact_persons'
    ) as FormArray;

    if (data !== undefined) {
      this.club_contact_persons.push(
        this._formBuilder.group({
          club_contact_designation: [data.designation, []],
          club_contact_name: [data.name, []],
          club_contact_email: [data.email, []],
          club_contact_phone_number: [data.phone, []]
        })
      );
    } else {
      this.club_contact_persons.push(
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
    this.club_contact_persons.removeAt(i);
  }

  addTrophy(data?: trophyObject) {
    this.club_trophies = this.editProfileForm.get('club_trophies') as FormArray;

    if (data !== undefined) {
      this.club_trophies.push(
        this._formBuilder.group({
          trophy_name: [data.name, []],
          trophy_years: [data.years, []],
          trophy_position: [data.position, []]
        })
      );
    } else {
      this.club_trophies.push(
        this._formBuilder.group({
          trophy_name: ['', []],
          trophy_years: ['', []],
          trophy_position: ['', []]
        })
      );
    }
  }

  removeTrophy(i: number) {
    this.club_trophies.removeAt(i);
  }

  addTopSigning(data?: topSigningObject) {
    this.club_top_signings = this.editProfileForm.get(
      'club_top_signings'
    ) as FormArray;

    if (data !== undefined) {
      this.club_top_signings.push(
        this._formBuilder.group({
          top_signings: [data.top_signings, []]
        })
      );
    } else {
      this.club_top_signings.push(
        this._formBuilder.group({
          top_signings: ['', []]
        })
      );
    }
  }

  removeTopSigning(i: number) {
    this.club_top_signings.removeAt(i);
  }
}
