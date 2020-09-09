import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SecurityComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    MatInputModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule {}
