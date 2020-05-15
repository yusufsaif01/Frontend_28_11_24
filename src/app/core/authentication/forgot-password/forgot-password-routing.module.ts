import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { extract } from '@app/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    data: { title: extract('Forgot Password') }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule {}
