import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
  // , PreloadAllModules
} from '@angular/router';
import { extract } from '@app/core';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './core/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './core/authentication/reset-password/reset-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreatePasswordComponent } from './core/authentication/create-password/create-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ManagePlayerComponent } from './admin/manage-player/manage-player.component';
import { ManageClubComponent } from './admin/manage-club/manage-club.component';
import { ManageAcademyComponent } from './admin/manage-academy/manage-academy.component';
import { TimelineComponent } from './timeline/timeline.component';
import { LinkExpiredComponent } from '@app/shared/page-components/link-expired/link-expired.component';
import { NotFoundComponent } from '@app/shared/page-components/not-found/not-found.component';
import { AwardCertificateComponent } from './award-certificate/award-certificate.component';
import { ManageLocationComponent } from './admin/masterdata/manage-location/manage-location.component';
import { ManageStateComponent } from './admin/masterdata/manage-location/manage-state/manage-state.component';
import { ManageCityComponent } from './admin/masterdata/manage-location/manage-city/manage-city.component';
import { MemberTypeComponent } from './admin/masterdata/member-type/member-type.component';
import { ManagePositionComponent } from './admin/masterdata/player-specialization/manage-position/manage-position.component';
import { ManageAbilityComponent } from './admin/masterdata/player-specialization/manage-ability/manage-ability.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './core/authentication/login/login.module#LoginModule'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: extract('Forgot Password') }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: { title: extract('Reset Password') }
  },
  {
    path: 'register',
    component: RegistrationComponent,
    data: { title: extract('Registration') }
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    data: { title: extract('Edit Profile') }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: extract('View Profile') }
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    data: { title: extract('Timeline') }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: { title: extract('Change Password') }
  },
  {
    path: 'create-password',
    component: CreatePasswordComponent,
    data: { title: extract('Create Password') }
  },
  {
    path: 'manage-player',
    component: ManagePlayerComponent,
    data: { title: extract('Manage Player') }
  },
  {
    path: 'awardcertification',
    component: AwardCertificateComponent,
    data: { title: extract('Awards and Certification') }
  },
  {
    path: 'manage-club',
    component: ManageClubComponent,
    data: { title: extract('Manage Club') }
  },

  {
    path: 'manage-academy',
    component: ManageAcademyComponent,
    data: { title: extract('Manage Academy') }
  },

  {
    path: 'masterdata-location',
    component: ManageLocationComponent,
    data: { title: extract('Manage Location') }
  },

  {
    path: 'masterdata-state/:id',
    component: ManageStateComponent,
    data: { title: extract('Manage State') }
  },
  {
    path: 'masterdata-city/:id',
    component: ManageCityComponent,
    data: { title: extract('Manage City') }
  },

  {
    path: 'masterdata-membertype',
    component: MemberTypeComponent,
    data: { title: extract('Member Type ') }
  },

  {
    path: 'masterdata-position',
    component: ManagePositionComponent,
    data: { title: extract('Manage Position ') }
  },

  {
    path: 'masterdata-ability',
    component: ManageAbilityComponent,
    data: { title: extract('Manage Ability ') }
  },

  {
    path: 'link-expired',
    component: LinkExpiredComponent,
    data: { title: extract('Link Expired') }
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
