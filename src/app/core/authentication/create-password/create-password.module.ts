import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePasswordRoutingModule } from './create-password-routing.module';
import { CreatePasswordComponent } from './create-password.component';

@NgModule({
  declarations: [CreatePasswordComponent],
  imports: [CommonModule, CreatePasswordRoutingModule]
})
export class CreatePasswordModule {}
