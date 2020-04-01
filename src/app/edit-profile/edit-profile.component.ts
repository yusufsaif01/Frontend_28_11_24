import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  member_type = "player";
  player_type = "amateur";
  aboutForm: FormGroup;
  socialProfileForm: FormGroup;
  editProfileForm : FormGroup;
  playerProfileForm: FormGroup;
  clubProfileForm: FormGroup;
  academyProfileForm: FormGroup;


  constructor(
    private _formBuilder           : FormBuilder,
    private _authenticationSerivce : AuthenticationService,
  ) {
    this.createForm()
  }

  ngOnInit() {}

  about(){

  }

  editProfile(){
    // console.log("form_data",this.editProfileForm.value)
    let { player_type, player_first_name,player_last_name,player_dob,player_height_foot,
      player_height_inches,player_weight,player_nationality,
      player_state,player_current_city,player_email,player_phone,
      player_current_school_name,player_current_university_name,player_current_college_name,player_upload_aadhar,
      player_employment_contract,player_position1,player_position2,player_position3,player_strong_foot,
      player_associated_club,player_weak_foot,player_head_coach_phone_number,player_head_coach_email_number,player_former_club
    } = this.editProfileForm.value;
    let form_data = {}
    form_data['player_type']= player_type
    form_data['first_name']= player_first_name
    form_data['last_name'] = player_last_name
    form_data['dob']=player_dob
    form_data['height'] = player_height_foot
    form_data['weight'] = player_weight
    form_data['country'] = player_nationality
    form_data['state'] = player_state
    form_data['city'] = player_current_city
    // form_data['email'] = player_email
    form_data['phone'] = player_phone
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




  createForm(){
    this.aboutForm = this._formBuilder.group({
      about: [''],
      bio  : ['']
    });

    this.socialProfileForm = this._formBuilder.group({
      insta: [],
      fb: [],
      twitter:[],
      youtube:[]
    });

    this.editProfileForm = this._formBuilder.group({
    // personal_details
      player_type : [this.player_type,[]],
      player_first_name : ['samyak',[]],
      player_last_name : ['jain',[]],
      player_dob : ['2020-04-14',[]],//2020-04-14T18:30:00.000Z"
    player_height_foot : ['5',[]],//height
    player_height_inches : ['5',[]],
      player_weight : ['50',[]],
    player_nationality : ['indian',[]],//country
      player_state : ['state1',[]],
    player_current_city : ['city2',[]],//city
      player_email : ['samyak.jain@4thpointer.com',[]],
      player_phone : ['9898989898',[]],
    player_current_school_name : ['school1',[]],//institute.school
    player_current_university_name : ['university1',[]],//institute.univeristy
    player_current_college_name : ['college1',[]],//institute.college
    player_upload_aadhar : ['',[]],
    player_employment_contract : ['',[]],
    // // professional_details
    player_position1 : ['saab',[]],
    player_position2 : ['saab',[]],
    player_position3 : ['saab',[]],
    player_strong_foot : ['saab',[]],
    player_associated_club : ['yes',[]],
    player_weak_foot : ['',[]],
    player_head_coach_phone_number : ['9898989898',[]],
    player_head_coach_email_number : ['coach@gmail.com',[]],
    player_former_club : ['',[]],

    })

    // this.academyProfileForm = this._formBuilder.group({
    //   name : ['', ['']],
    //   email : ['', ['']],
    //   // phone_number : ['', ['']],
  
    //   academy_name : ['', ['']],
    //   short_academy_name : ['', ['']],
    //   founded : ['', ['']],
    //   country : ['', ['']],
    //   city : ['', ['']],
    //   office_address : ['', ['']],
    //   pincode : ['', ['']],
    //   email_address : ['', ['']],
    //   phone_number : ['', ['']],
    //   stadium_name : ['', ['']],
    //   // academy_name : ['', ['']],
    //   manager : ['', ['']],
  
    // });
    
    
    
  }
}
