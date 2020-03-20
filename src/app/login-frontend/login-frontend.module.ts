import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { LoginFrontendRoutingModule } from './login-frontend-routing.module';
import { LoginFrontendComponent } from './login-frontend.component';

@NgModule({
  declarations: [LoginFrontendComponent],
  imports: [CommonModule, LoginFrontendRoutingModule, SharedModule]
})
export class LoginFrontendModule {}
