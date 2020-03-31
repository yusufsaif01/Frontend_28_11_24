import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../core/authentication/authentication.service';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  
  forgetPasswordForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService:AuthenticationService
  ) {
    this.createForm()
  }

  ngOnInit() {}
  

  isFocused(form:FormGroup, field:string){
    const {invalid, touched} = form.get(field);
    return invalid && touched;
  }

  isRequired(form:FormGroup, field:string){
    const { required } =  form.get(field).errors
    return required;
  }

  forgetPassword(){
    console.log('form data',this.forgetPasswordForm.value);
    this._authenticationService.forgetPassword(this.forgetPasswordForm.value)
      .subscribe(
        (response)=>{
          console.log('response data',response);
        },
        error =>{
          console.log("err",error);
          
        }
      );
  }


  createForm(){
    this.forgetPasswordForm = this._formBuilder.group({
      email: [ '', [ Validators.required, Validators.email ] ]
    });
  }
}
