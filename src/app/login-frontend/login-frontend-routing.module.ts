import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFrontendComponent } from './login-frontend.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login-frontend', component: LoginFrontendComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginFrontendRoutingModule {}
