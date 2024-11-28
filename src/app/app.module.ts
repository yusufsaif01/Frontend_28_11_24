import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angulartics2Module } from 'angulartics2';
import { GlobalErrorHandler } from './global-error-handler';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { LoginModule } from './core/authentication/login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { LoaderInterceptor } from './core/http/loader.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from './registration/registration.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy/privacy-policy.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatSortModule } from '@angular/material/sort';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { DeleteConfirmationComponent } from './shared/dialog-box/delete-confirmation/delete-confirmation.component';
import { StatusConfirmationComponent } from './shared/dialog-box/status-confirmation/status-confirmation.component';
import { VerificationPopupComponent } from './shared/dialog-box/verification-popup/verification-popup.component';
import { VideoPopupComponent } from '@app/timeline/video-popup/video-popup.component';
import { RoleGuardService } from './core/authentication/role-guard.service';
import { JwtInterceptor } from './core/http/jwt.interceptor';
import { ErrorInterceptor } from './core/http/error.interceptor';
import { StoreModule } from '@ngrx/store';
import { uploader } from './redux/reducer';
import { HomeModule } from './home/home.module';
import { SecurityModule } from './security/security.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermandconditionComponent } from './termandcondition/termandcondition.component';
import { CookiesPolicyComponent } from './cookies-policy/cookies-policy.component';
import { CommunityGuidelinesComponent } from './community-guidelines/community-guidelines.component';
import { AdsenseModule } from 'ng2-adsense';
import { UserguideComponent } from './userguide/userguide.component';
import { GuideComponent } from './guide/guide.component';
import { ManagecoacheComponent } from './manage-coache/manage-coache.component';
import { AddcoacheComponent } from './manage-coache/add-coache/add-coache.component';
import { TraningCenterComponent } from './traning-center/traning-center.component';
import { AddCenterComponent } from './traning-center/add-center/add-center.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AttendanceComponent } from './attendance/attendance.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpForForgotPasswordComponent } from './otp-for-forgot-password/otp-for-forgot-password.component';
import { VerificationTypeComponent } from './verification-type/verification-type.component';
import { OtpPhoneComponent } from './otp-phone/otp-phone.component';
import { OtpTypeComponent } from './otp-type/otp-type.component';
import { AccountDeleteComponent } from './account-delete/account-delete.component';
import { GtagModule } from 'angular-gtag';
import { AccountDeleteInstructionComponent } from './account-delete-instruction/account-delete-instruction.component';
import { AccountDeleteInstructionForMobileComponent } from './account-delete-instruction-for-mobile/account-delete-instruction-for-mobile.component';
import { AssignTraningCenterComponent } from './assign-traning-center/assign-traning-center.component';
import { DateListPopupComponent } from './attendance/attendance/date-list-popup/date-list-popup.component';
import { AttendanceHistoryViewComponent } from './attendance/attendance-history-view/attendance-history-view.component';

@NgModule({
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    }),
    GtagModule.forRoot({ trackingId: 'G-ZNGK6MZ27R' }), // Google tags
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
    NgOtpInputModule,
    // SecurityModule,
    // LoginModule,
    HomeModule,
    Angulartics2Module.forRoot(),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      closeButton: true
    }),
    StoreModule.forRoot({ uploader }),
    NgxTrimDirectiveModule,
    AdsenseModule.forRoot({
      adClient: 'pub-8133526594590676'
    })
  ],
  declarations: [
    AppComponent,
    RegistrationComponent,
    PrivacyPolicyComponent,
    ChangePasswordComponent,
    DeleteConfirmationComponent,
    StatusConfirmationComponent,
    VerificationPopupComponent,
    VideoPopupComponent,
    AboutUsComponent,
    AddcoacheComponent,
    AddCenterComponent,
    TermandconditionComponent,
    CookiesPolicyComponent,
    CommunityGuidelinesComponent,
    UserguideComponent,
    GuideComponent,
    ManagecoacheComponent,
    TraningCenterComponent,
    AttendanceComponent,
    MarkAttendanceComponent,
    OtpPageComponent,
    OtpForForgotPasswordComponent,
    VerificationTypeComponent,
    OtpPhoneComponent,
    OtpTypeComponent,
    AccountDeleteComponent,
    AccountDeleteInstructionComponent,
    AccountDeleteInstructionForMobileComponent,
    AssignTraningCenterComponent,
    DateListPopupComponent,
    AttendanceHistoryViewComponent
  ],
  providers: [
    RoleGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    DeleteConfirmationComponent,
    StatusConfirmationComponent,
    VerificationPopupComponent,
    VideoPopupComponent,
    GuideComponent,
    AddcoacheComponent,
    AddCenterComponent,
    DateListPopupComponent
  ]
})
export class AppModule {}
