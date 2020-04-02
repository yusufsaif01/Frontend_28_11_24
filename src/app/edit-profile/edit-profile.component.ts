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

    if(this.member_type==='player'){

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

  about(){
    console.log('about form',this.aboutForm.value);    
    let token = localStorage.getItem('token')
    this._authenticationSerivce.updateBio(this.aboutForm.value,token)
    .subscribe(
      res=>{
        console.log('response',res);
      },
      err => {
        console.log('err',err);        
      }
    )
  }

  editProfile(){
    // console.log("form_data",this.editProfileForm.value)
  

    let form_data = {}
    const formData = new FormData();
    if(this.member_type==="player"){
      //player
      let {player_type, 
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
        player_upload_aadhar,
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
      } = this.editProfileForm.value
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
     
      let inst:any = {"school":player_current_school_name}
      formData.append('file',this.aadharformContent,this.aadharformContent.name);
      formData.append('player_type', player_type);
      formData.append('first_name',  player_first_name);
      formData.append('last_name', player_last_name);
      formData.append('dob', player_dob);
      formData.append('height', player_height_foot);
      formData.append('weight', player_weight);
      formData.append('state', player_state);
      formData.append('nationality', player_nationality);
      formData.append('phone', player_phone);
      formData.append('city',player_current_city);      
      formData.append('player_current_university_name', player_current_university_name);
      formData.append('college', player_current_college_name);
      formData.append('institution', inst);
      formData.append('weak_foot', player_weak_foot);
      formData.append('former_club',player_former_club);      

    }
    else if(this.member_type==="club" ||this.member_type==="academy"){
      let { 
        club_name ,
        club_short_name ,
        club_founded_in ,
        club_country ,
        club_city ,
        club_address ,
        club_pincode ,
        // club_email ,
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
      // form_data['name']= club_name 
      // form_data['short_name']= club_short_name 
      // form_data['founded_in'] = club_founded_in 
      // form_data['country']=club_country 
      // form_data['city'] = club_city 
      // form_dat``a[''] = club_address 
      // form_data[''] = club_pincode 
      // form_data[''] = club_email 
      // form_data['phone'] = club_phone 
      // form_data['stadium'] = club_stadium_name 
      // form_data[''] = club_owner
      formData.append('player_type', form_data['player_type']);
      formData.append('name',  club_name);
      formData.append('short_name',  club_short_name);
      formData.append('founded_in', club_founded_in);
      formData.append('country', club_country);
      formData.append('phone', club_phone);
      formData.append('city',club_city);    

 
    }
    // else if(this.member_type==="academy"){
      
    // } 




    console.log(formData);
    let token = localStorage.getItem('token')
    this._authenticationSerivce.editProfile(formData,token)
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
      about: [''],
      bio  : ['']
    });

    this.socialProfileForm = this._formBuilder.group({
      insta: [''],
      fb: [''],
      twitter:[''],
      youtube:['']
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

    else if(this.member_type==='club' || this.member_type==='academy'){
      this.editProfileForm = this._formBuilder.group({
        // personal_details
        club_name : ['', [ Validators.required ]],
        club_short_name : ['', [ Validators.required ]],
        club_founded_in : ['', [ Validators.required ]],
        club_country : ['', [ Validators.required ]],
        club_city : ['', [ Validators.required ]],
        club_address : ['', [ Validators.required ]],
        club_pincode : ['', [ Validators.required ]],
        // club_email : ['',],
        club_phone : ['', [ Validators.required ]],
        club_stadium_name : ['', [ Validators.required ]],
        club_owner:['', [ Validators.required ]],
        club_manager : ['', [ Validators.required ]],
        club_document: ['', [ Validators.required ]],
        club_aiff: ['', [ Validators.required ]],
    
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

