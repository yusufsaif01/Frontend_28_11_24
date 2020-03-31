import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
  // , PreloadAllModules
} from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
