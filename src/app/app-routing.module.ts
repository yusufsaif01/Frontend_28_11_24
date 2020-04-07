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
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { AdminManagePlayerComponent } from './admin/admin-manage-player/admin-manage-player.component';
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
    path: 'admin',
    component: AdminViewComponent,
    data: { title: extract('admin') }
  },
  {
    path: 'manage-player',
    component: AdminManagePlayerComponent,
    data: { title: extract('admin') }
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
