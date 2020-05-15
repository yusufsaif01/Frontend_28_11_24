import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { extract } from '@app/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent,
    data: { title: extract('Reset Password') }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule {}
