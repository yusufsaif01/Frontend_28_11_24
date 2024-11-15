import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
  // , PreloadAllModules
} from '@angular/router';
import { extract, AuthenticationGuard, RestrictionGuard } from '@app/core';
import { RegistrationComponent } from './registration/registration.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy/privacy-policy.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LinkExpiredComponent } from '@app/shared/page-components/link-expired/link-expired.component';
import { NotFoundComponent } from '@app/shared/page-components/not-found/not-found.component';
import { ReportCardModule } from './report-card/report-card.module';
import { TermandconditionComponent } from './termandcondition/termandcondition.component';
import { CommunityGuidelinesComponent } from './community-guidelines/community-guidelines.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CookiesPolicyComponent } from './cookies-policy/cookies-policy.component';
import { UserguideComponent } from './userguide/userguide.component';
import { ManagecoacheComponent } from './manage-coache/manage-coache.component';
import { TraningCenterComponent } from './traning-center/traning-center.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { VerificationTypeComponent } from './verification-type/verification-type.component';
import { OtpForForgotPasswordComponent } from './otp-for-forgot-password/otp-for-forgot-password.component';
import { OtpPhoneComponent } from './otp-phone/otp-phone.component';
import { OtpTypeComponent } from './otp-type/otp-type.component';
import { AccountDeleteComponent } from './account-delete/account-delete.component';
import { AccountDeleteInstructionComponent } from './account-delete-instruction/account-delete-instruction.component';
import { AccountDeleteInstructionForMobileComponent } from './account-delete-instruction-for-mobile/account-delete-instruction-for-mobile.component';
import { AssignTraningCenterComponent } from './assign-traning-center/assign-traning-center.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'security',
    loadChildren: './security/security.module#SecurityModule'
  },
  {
    path: 'login',
    // canActivate: [RestrictionGuard],
    loadChildren: './core/authentication/login/login.module#LoginModule'
  },

  {
    path: 'member/awardcertification',
    loadChildren:
      './award-certificate/award-certificate.module#AwardCertificateModule'
  },
  {
    path: 'member/timeline',
    loadChildren: './timeline/timeline.module#TimelineModule'
  },
  {
    path: 'forgot-password',
    // canActivate: [RestrictionGuard],
    loadChildren:
      './core/authentication/forgot-password/forgot-password.module#ForgotPasswordModule'
  },
  {
    path: 'reset-password',
    // canActivate: [RestrictionGuard],
    loadChildren:
      './core/authentication/reset-password/reset-password.module#ResetPasswordModule'
  },
  {
    path: 'member/profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'member/manage-report-card',
    loadChildren: './report-card/report-card.module#ReportCardModule'
  },
  {
    path: 'member/manage-report-card/link-report-card',
    loadChildren: './report-card/report-card.module#ReportCardModule'
  },
  {
    path: 'member/manage',
    loadChildren:
      './manage-footmates/manage-footmates.module#ManageFootmatesModule'
  },
  {
    path: 'member/gallery',
    loadChildren: './gallery/gallery.module#GalleryModule'
  },
  {
    path: 'member/manage-footplayer',
    loadChildren:
      './manage-footplayer/manage-footplayer.module#ManageFootplayerModule'
  },
  {
    path: 'member/manage-coache',
    component: ManagecoacheComponent
  },
  {
    path: 'otp/otp-verfication-type',
    component: OtpTypeComponent
  },
  {
    path: 'otp-verification',
    component: OtpPageComponent
  },
  {
    path: 'otp/verification-type',
    component: VerificationTypeComponent
  },
  {
    path: 'otp-phone',
    component: OtpPhoneComponent
  },
  {
    path: 'OtpForForgotPasswordComponent',
    component: OtpForForgotPasswordComponent
  },

  {
    path: 'member/traning-center',
    component: TraningCenterComponent
  },
  {
    path: 'member/assign-traning-center/:send_to',
    component: AssignTraningCenterComponent
  },
  {
    path: 'member/attendance',
    component: AttendanceComponent
  },

  {
    path: 'member/mark-attendance/:send_to',
    component: MarkAttendanceComponent
  },

  {
    path: 'register',
    // canActivate: [RestrictionGuard],
    component: RegistrationComponent,
    data: { title: extract('Registration') }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: { title: extract('Change password') }
    // canActivate: [AuthenticationGuard]
  },
  {
    path: 'member/delete-account',
    component: AccountDeleteComponent,
    data: { title: extract('Delete Account') }
    // canActivate: [AuthenticationGuard]
  },
  {
    path: 'account-delete-instruction',
    component: AccountDeleteInstructionComponent,
    data: { title: extract('Delete Account Instruction') }
  },
  {
    path: 'account-delete-instruction-for-mobile',
    component: AccountDeleteInstructionForMobileComponent,
    data: { title: extract('Delete Account Instruction For Mobile') }
  },

  {
    path: 'create-password',
    // canActivate: [RestrictionGuard],
    loadChildren:
      './core/authentication/create-password/create-password.module#CreatePasswordModule'
  },
  {
    path: 'link-expired',
    component: LinkExpiredComponent,
    data: { title: extract('Link expired') }
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: { title: extract('Privacy Policy') }
  },
  {
    path: 'term&condition',
    component: TermandconditionComponent,
    data: { title: extract('Term and Condition') }
  },

  {
    path: 'community-guidelines',
    component: CommunityGuidelinesComponent,
    data: { title: extract('Community') }
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data: { title: extract('About') }
  },
  {
    path: 'user-guide',
    component: UserguideComponent,
    data: { title: extract('User Guide') }
  },
  {
    path: 'cookie-policy',
    component: CookiesPolicyComponent,
    data: { title: extract('Cookies') }
  },

  { path: '404', component: NotFoundComponent },

  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
