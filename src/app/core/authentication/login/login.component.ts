import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { environment } from '@env/environment';
import {
  Logger,
  I18nService,
  AuthenticationService,
  untilDestroyed,
  CredentialsService
} from '@app/core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  showPassword: boolean = false;
  tooltip: string =
    'Please provide at least 1 special character, 1 number and 1 alphabet';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private toastrService: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials: any) => {
          log.debug(`${credentials.email} successfully logged in`);
          this.toastrService.success('Successful', 'Login');
          if (credentials.data.role == 'admin') {
            this.router.navigate(
              [
                this.route.snapshot.queryParams.redirect ||
                  '/admin/manage-player'
              ],
              { replaceUrl: true }
            );
          } else {
            this.router.navigate(
              [this.route.snapshot.queryParams.redirect || '/member/timeline'],
              { replaceUrl: true }
            );
          }
          localStorage.setItem('user_id', credentials.data.user_id);
          localStorage.setItem('token', credentials.data.token);
          localStorage.setItem('member_type', credentials.data.member_type);
          if (credentials.data.player_type) {
            localStorage.setItem('player_type', credentials.data.player_type);
          }
          localStorage.setItem('email', credentials.data.email);
          if (credentials.data.avatar_url) {
            localStorage.setItem(
              'avatar_url',
              environment.mediaUrl + credentials.data.avatar_url
            );
          }
          // this.router.navigate(
          //   [this.route.snapshot.queryParams.redirect || '/xyz'],
          //   { replaceUrl: true }
          // );
          // this.router.navigate(['/reset-password'])
          this.credentialsService.setCredentials(
            credentials,
            true //this.loginForm.value.remember
          );
        },
        error => {
          // log.debug(`Login error: ${error}`);

          this.toastrService.error(`${error.error.message}`, 'Login');
          this.error = error;
        }
      );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], //Validators.pattern("[^ @]*@[^ @]*")
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  showHidePassword() {
    if (this.showPassword) {
      this.showPassword = false;
    } else {
      this.showPassword = true;
    }
  }
}
