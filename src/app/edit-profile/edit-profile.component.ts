import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  // member_type = 'academy';
  // player_type = "grassroot";
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

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationSerivce: AuthenticationService
  ) {
    this.createForm();
    // this.setUserCategoryValidators()
  }

  ngOnInit() {}

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
    this._authenticationSerivce.editProfile(formData1, token).subscribe(
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
    this._authenticationSerivce
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
    this._authenticationSerivce.updateBio(formData1, token).subscribe(
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
        player_first_name: ['samyak', [Validators.required]],
        player_last_name: ['jain', [Validators.required]],
        player_dob: ['2020-04-14', [Validators.required]], //2020-04-14T18:30:00.000Z"
        player_height_foot: ['5', [Validators.required]], //height
        player_height_inches: ['5', [Validators.required]],
        player_weight: ['50', [Validators.required]],
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
        player_position2: ['saab', []],
        player_position3: ['', []],
        player_strong_foot: ['', []],
        player_associated_club: ['', []],
        player_weak_foot: ['', []],
        player_head_coach_phone_number: ['', []],
        player_head_coach_email_number: ['coach@gmail.com', []],
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
        manager: ['', [Validators.required]]
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
        document_type: ['aiff', [Validators.required]]
        //onclick upload documenet aiff / pan card/tin / coi
      });
    }
  }
}
