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
import { ManageParametersComponent } from './admin/masterdata/player-specialization/manage-ability/manage-parameters/manage-parameters.component';
import { RoleGuardService } from './core/authentication/role-guard.service';
import { FootRequestComponent } from './foot-request/foot-request.component';
import { FootMatesComponent } from './foot-request/foot-mates/foot-mates.component';
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
    data: {
      title: extract('Edit Profile'),
      expectedRole: ['player', 'club', 'academy']
    },
    canActivate: [RoleGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: extract('View Profile'),
      expectedRole: ['player', 'club', 'academy']
    },
    canActivate: [RoleGuardService]
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    data: {
      title: extract('Timeline'),
      expectedRole: ['player', 'club', 'academy']
    },
    canActivate: [RoleGuardService]
  },
  {
    path: 'footrequest',
    component: FootRequestComponent,
    data: { title: extract('FootRequest') }
  },
  {
    path: 'footmates',
    component: FootMatesComponent,
    data: { title: extract('FootMates') }
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
    data: { title: extract('Manage Player'), expectedRole: ['admin'] },
    canActivate: [RoleGuardService]
  },
  {
    path: 'awardcertification',
    component: AwardCertificateComponent,
    data: { title: extract('Awards and Certification') }
  },
  {
    path: 'manage-club',
    component: ManageClubComponent,
    data: { title: extract('Manage Club'), expectedRole: ['admin'] },
    canActivate: [RoleGuardService]
  },

  {
    path: 'manage-academy',
    component: ManageAcademyComponent,
    data: { title: extract('Manage Academy'), expectedRole: ['admin'] },
    canActivate: [RoleGuardService]
  },

  {
    path: 'masterdata-location',
    component: ManageLocationComponent,
    data: { title: extract('Manage Location'), expectedRole: ['admin'] },
    canActivate: [RoleGuardService]
  },

  {
    path: 'masterdata-state/:id',
    component: ManageStateComponent,
    data: { title: extract('Manage State'), expectedRole: ['admin'] },
    canActivate: [RoleGuardService]
  },
  {
    path: 'masterdata-city/:id',
    component: ManageCityComponent,
    data: { title: extract('Manage City'), expectedRole: ['admin'] },
    canActivate: [RoleGuardService]
  },

  {
    path: 'masterdata-membertype',
    component: MemberTypeComponent,
    data: { title: extract('Member Type '), expectedRole: ['admin'] },
    canActivate: [RoleGuardService]
  },

  {
    path: 'masterdata-position',
    component: ManagePositionComponent,
    data: { title: extract('Manage Position '), expectedRole: ['admin'] },
    canActivate: [RoleGuardService]
  },

  {
    path: 'masterdata-ability',
    component: ManageAbilityComponent,
    data: { title: extract('Manage Ability '), expectedRole: ['admin'] },
    canActivate: [RoleGuardService]
  },

  {
    path: 'masterdata-parameter/:id',
    component: ManageParametersComponent,
    data: { title: extract('Manage Parameter '), expectedRole: ['admin'] },
    canActivate: [RoleGuardService]
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
