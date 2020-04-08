import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angulartics2Module } from 'angulartics2';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
// import { HomeModule } from './home/home.module';
// import { ShellModule } from './shell/shell.module';
import { LoginModule } from './core/authentication/login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
// import { HomeComponent } from './pages/home/home.component';
import { LoginFrontendModule } from './login-frontend/login-frontend.module';
import { LoaderInterceptor } from './core/http/loader.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { FrontendModule } from './frontend/frontend.module';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './core/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './core/authentication/reset-password/reset-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreatePasswordComponent } from './core/authentication/create-password/create-password.component';
import { ProfileComponent } from './profile/profile.component';
import { MatSortModule } from '@angular/material/sort';
import { FeatherModule } from 'angular-feather';

import {
  Camera,
  Heart,
  Github,
  Users,
  Crosshair,
  MessageSquare,
  Bell,
  AlertCircle,
  Image,
  Delete,
  Trash2,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Clock,
  Star
} from 'angular-feather/icons';
import { from } from 'rxjs';
import { ManagePlayerComponent } from './admin/manage-player/manage-player.component';
import { FilterDialogPlayerComponent } from './admin/filter-dialog-player/filter-dialog-player.component';
import { ManageClubComponent } from './admin/manage-club/manage-club.component';
import { FilterDialogClubComponent } from './admin/filter-dialog-club/filter-dialog-club.component';
import { ManageAcademyComponent } from './admin/manage-academy/manage-academy.component';
import { FilterDialogAcademyComponent } from './admin/filter-dialog-academy/filter-dialog-academy.component';
const icons = {
  Camera,
  Heart,
  Github,
  Users,
  Crosshair,
  MessageSquare,
  Bell,
  AlertCircle,
  Image,
  Delete,
  Trash2,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Clock,
  Star
};

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    CommonModule,
    // ShellModule,
    // HomeModule,
    LoginModule,
    LoginFrontendModule,
    FeatherModule.pick(icons),
    // FrontendModule,
    Angulartics2Module.forRoot(),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    })
  ],
  declarations: [
    AppComponent,
    RegistrationComponent,
    EditProfileComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    CreatePasswordComponent,
    ProfileComponent,
    ManagePlayerComponent,
    FilterDialogPlayerComponent,
    ManageClubComponent,
    FilterDialogClubComponent,
    ManageAcademyComponent,
    FilterDialogAcademyComponent
    // , HomeComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    FilterDialogPlayerComponent,
    FilterDialogClubComponent,
    FilterDialogAcademyComponent
  ]
})
export class AppModule {}
