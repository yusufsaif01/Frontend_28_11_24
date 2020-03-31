import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm:FormGroup;
  token:string

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _route: ActivatedRoute
  ) {
    this.createForm();
    this._route.queryParams.subscribe(params => {
      this.token = params['token']
  });
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
    this._authenticationService.resetPassword(this.resetPasswordForm.value, this.token)
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
      password        : ['', Validators.required ],
      confirmPassword : ['', Validators.required ]
    })
  }
}
