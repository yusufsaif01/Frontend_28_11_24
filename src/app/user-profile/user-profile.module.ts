import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, UserProfileRoutingModule]
})
export class UserProfileModule {}
