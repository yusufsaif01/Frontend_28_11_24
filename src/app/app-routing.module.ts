import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
  // , PreloadAllModules
} from '@angular/router';
import { extract } from '@app/core';
import { RegistrationComponent } from './registration/registration.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { LinkExpiredComponent } from '@app/shared/page-components/link-expired/link-expired.component';
import { NotFoundComponent } from '@app/shared/page-components/not-found/not-found.component';
import { RoleGuardService } from './core/authentication/role-guard.service';
import { FootRequestComponent } from './foot-request/foot-request.component';
import { FootMatesComponent } from './foot-mates/foot-mates.component';
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
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
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
    loadChildren:
      './core/authentication/forgot-password/forgot-password.module#ForgotPasswordModule'
  },
  {
    path: 'reset-password',
    loadChildren:
      './core/authentication/reset-password/reset-password.module#ResetPasswordModule'
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
    path: 'profile/:handle',
    component: ProfileComponent,
    data: {
      title: extract('View Profile'),
      expectedRole: ['player', 'club', 'academy']
    },
    canActivate: [RoleGuardService]
  },
  {
    path: 'foot-requests',
    component: FootRequestComponent,
    data: { title: extract('Foot Requests') }
  },
  {
    path: 'foot-mates',
    component: FootMatesComponent,
    data: { title: extract('Foot Mates') }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: { title: extract('Change Password') }
  },
  {
    path: 'create-password',
    loadChildren:
      './core/authentication/create-password/create-password.module#CreatePasswordModule'
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
