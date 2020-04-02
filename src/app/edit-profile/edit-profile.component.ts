import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  
  // member_type = 'player';
  // player_type = "grassroot";
  member_type:string = localStorage.getItem('member_type') || 'player';
  player_type = localStorage.getItem('player_type') || "grassroot";
  aboutForm: FormGroup;
  socialProfileForm: FormGroup;
  editProfileForm : FormGroup;
  playerProfileForm: FormGroup;
  clubProfileForm: FormGroup;
  academyProfileForm: FormGroup;
  aadharformContent: any;

  constructor(
    private _formBuilder           : FormBuilder,
    private _authenticationSerivce : AuthenticationService,
  ) {
    this.createForm()
    // this.setUserCategoryValidators()
  }

  ngOnInit() {
  }

  selectTab(tabName:string){
    this.editProfileForm.reset();
    // this.createForm()
    this.player_type=tabName;
    this.createForm()
    this.setPlayerCategoryValidators()
    console.log('player_type',this.player_type);
  }

  isFocused(form: FormGroup, field: string) {
    const { invalid, touched } = form.get(field);
    return invalid && touched;
  }

  isRequired(form: FormGroup, field: string) {
    const { required } = form.get(field).errors;
    return required;
  }
  setPlayerCategoryValidators() {

    const univeristyNameControl  = this.editProfileForm.get('player_current_university_name');
    const collegeNameControl = this.editProfileForm.get('player_current_college_name');
    const employmentContract  = this.editProfileForm.get('player_employment_contract');
    
    this.editProfileForm.get('player_type').valueChanges
      .subscribe(player_type => {

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

  about(){

  }

  editProfile(){
    // console.log("form_data",this.editProfileForm.value)
  

    let form_data = {}
    if(this.member_type==="player"){
      //player
      let {player_type, player_first_name,player_last_name,player_dob,player_height_foot,
        player_height_inches,player_weight,player_nationality,
        player_state,player_current_city,player_email,player_phone,
        player_current_school_name,player_current_university_name,player_current_college_name,player_upload_aadhar,
        player_employment_contract,player_position1,player_position2,player_position3,player_strong_foot,
        player_associated_club,player_weak_foot,player_head_coach_phone_number,player_head_coach_email_number,player_former_club
      } = this.editProfileForm.value
      form_data['player_type']= player_type
      form_data['first_name']= player_first_name
      form_data['last_name'] = player_last_name
      form_data['dob']=player_dob
      form_data['height'] = player_height_foot
      form_data['weight'] = player_weight
      form_data['country'] = player_nationality
      form_data['state'] = player_state
      form_data['city'] = player_current_city
      form_data['email'] = player_email
      form_data['phone'] = player_phone
      form_data['form_data'] = this.aadharformContent

    }
    else if(this.member_type==="club"){
      let { 
        club_name ,
        club_short_name ,
        club_founded_in ,
        club_country ,
        club_city ,
        club_address ,
        club_pincode ,
        club_email ,
        club_phone ,
        club_stadium_name ,
        club_owner,
        club_manager ,
        club_document,
        club_aiff,
        club_contact_designation,
        club_contact_name,
        club_contact_email,
        club_contact_phone_number,
        club_trophies,
        club_league,
        club_top_signings,
        club_ass_player
      } = this.editProfileForm.value;
      // club
      form_data['name']= club_name 
      form_data['short_name']= club_short_name 
      form_data['founded_in'] = club_founded_in 
      form_data['country']=club_country 
      form_data['city'] = club_city 
      // form_dat``a[''] = club_address 
      // form_data[''] = club_pincode 
      // form_data[''] = club_email 
      form_data['phone'] = club_phone 
      form_data['stadium'] = club_stadium_name 
      // form_data[''] = club_owner

    }
    // else if(this.member_type==="academy"){
      
    // } 




    console.log(form_data);
    let token = localStorage.getItem('token')
    this._authenticationSerivce.editProfile(form_data,token)
    .subscribe(
      res=>{
        console.log('response',res);
      },
      err => {
        console.log('err',err);        
      }
    )
  }

  uploadAadhar(event:any){
    console.log('##################',event.target.files);
    const formData  = new FormData();
    this.aadharformContent = formData.append("file", event.target.files[0]);

  }

  createForm(){
    this.aboutForm = this._formBuilder.group({
      about: [],
      bio  : []
    });

    this.socialProfileForm = this._formBuilder.group({
      insta: [],
      fb: [],
      twitter:[],
      youtube:[]
    });

    if(this.member_type==='player'){
      this.editProfileForm = this._formBuilder.group({
      // personal_details
        player_type : [this.player_type,[ Validators.required ]],
        player_first_name : ['samyak',[ Validators.required ]],
        player_last_name : ['jain',[ Validators.required ]],
        player_dob : ['2020-04-14',[ Validators.required ]],//2020-04-14T18:30:00.000Z"
      player_height_foot : ['5',[ Validators.required ]],//height
      player_height_inches : ['5',[ Validators.required ]],
        player_weight : ['50',[ Validators.required ]],
      player_nationality : ['',[ Validators.required ]],//country
        player_state : ['',[ Validators.required ]],
      player_current_city : ['',[ Validators.required ]],//city
        // player_email : ['',[ Validators.required ]],
        player_phone : ['',[ Validators.required ]],
      player_current_school_name : ['',[ Validators.required ]],//institute.school
      player_current_university_name : ['',],//institute.univeristy
      player_current_college_name : ['',],//institute.college
      player_upload_aadhar : ['',[ ]],
      player_employment_contract : ['',[ ]],
      // // professional_details
      player_position1 : ['',[]],
      player_position2 : ['saab',[]],
      player_position3 : ['',[]],
      player_strong_foot : ['',[]],
      player_associated_club : ['',[]],
      player_weak_foot : ['',[]],
      player_head_coach_phone_number : ['',[]],
      player_head_coach_email_number : ['coach@gmail.com',[]],
      player_former_club : ['',[]]
      })

    }

    else if(this.member_type==='club'){
      this.editProfileForm = this._formBuilder.group({
        // personal_details
        club_name : ['club_name1', []],
        club_short_name : ['short_club1', []],
        club_founded_in : ['1900', []],
        club_country : ['India', []],
        club_city : ['Bhopal', []],
        club_address : ['club_address1', []],
        club_pincode : ['111111', []],
        club_email : ['', []],
        club_phone : ['9989898989', []],
        club_stadium_name : ['club_stadium_name1', []],
        club_owner:['club_owner1', []],
        club_manager : ['club_manger1', []],
        club_document: ['tin', []],
        club_aiff: ['', []],
    
        // professional_details
        club_contact_designation : ['', []],
        club_contact_name:['', []],
        club_contact_email:['', []],
        club_contact_phone_number:['', []],
    
        club_trophies:['', []],
        club_league:['', []],
        club_top_signings:['', []],
        club_ass_player :['', []]
        })    
    }    
  }
}

