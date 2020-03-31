import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm:FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  isFocused(form: FormGroup, field: string) {
    const { invalid, touched } = form.get(field);
    return invalid && touched;
  }

  isRequired(form: FormGroup, field: string) {
    const { required } = form.get(field).errors;
    return required;
  }

  resetPassword(){
    this._authenticationService.resetPassword(this.resetPasswordForm.value)
    .subscribe(
      (response)=>{
        console.log('data',response)
      },
      error =>{
        console.log('error',error);
        
      }
    );
  }

  createForm(){
    this.resetPasswordForm = this._formBuilder.group({
      new_password    : ['', Validators.required ],
      confirm_password: ['', Validators.required ]
    })
  }
}
