import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendRoutingModule } from './frontend-routing.module';
import { FrontendComponent } from './frontend.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [FrontendComponent],
  imports: [CommonModule, SharedModule, FrontendRoutingModule]
})
export class FrontendModule {}
