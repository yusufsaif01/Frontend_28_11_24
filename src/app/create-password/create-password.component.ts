import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

  createPasswordForm:FormGroup;
  token:string

  constructor(
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router:Router
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

  createPassword(){
    this._authenticationService.createPassword(this.createPasswordForm.value, this.token)
    .subscribe(
      (response)=>{
        console.log('data',response)
        this._router.navigate(['/login'])
      },
      error =>{
        console.log('error',error);
        
      }
    );
  }

  createForm(){
    this.createPasswordForm = this._formBuilder.group({
      password        : ['', Validators.required ],
      confirmPassword : ['', Validators.required ]
    })
  }
}
