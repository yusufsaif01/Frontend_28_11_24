import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { CreatePasswordRoutingModule } from './create-password-routing.module';
import { CreatePasswordComponent } from './create-password.component';

@NgModule({
  declarations: [CreatePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CreatePasswordRoutingModule
  ]
})
export class CreatePasswordModule {}
