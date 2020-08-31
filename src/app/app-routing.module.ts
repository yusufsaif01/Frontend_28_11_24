import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
  // , PreloadAllModules
} from '@angular/router';
import { extract, AuthenticationGuard } from '@app/core';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LinkExpiredComponent } from '@app/shared/page-components/link-expired/link-expired.component';
import { NotFoundComponent } from '@app/shared/page-components/not-found/not-found.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'security',
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
    path: 'member/profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'member/manage-report-card',
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
    path: 'register',
    component: RegistrationComponent,
    data: { title: extract('Registration') }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: { title: extract('Change password') },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'create-password',
    loadChildren:
      './core/authentication/create-password/create-password.module#CreatePasswordModule'
  },
  {
    path: 'link-expired',
    component: LinkExpiredComponent,
    data: { title: extract('Link expired') }
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
