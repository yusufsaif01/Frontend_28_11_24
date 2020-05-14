import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { extract } from '@app/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasswordComponent } from './create-password.component';

const appRoutes: Routes = [
  {
    path: '',
    component: CreatePasswordComponent,
    data: { title: extract('Create Password') }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class CreatePasswordRoutingModule {}
