import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { FootMatesComponent } from './foot-mates/foot-mates.component';
import { FootRequestComponent } from './foot-request/foot-request.component';
import { MutualFootmateComponent } from './mutual-footmate/mutual-footmate.component';
import { ManageFootmatesComponent } from './manage-footmates.component';
import { ManageFootmatesRoutingModule } from './manage-footmates-routing.module';

@NgModule({
  declarations: [
    FootMatesComponent,
    FootRequestComponent,
    MutualFootmateComponent,
    ManageFootmatesComponent
  ],
  imports: [CommonModule, SharedModule, ManageFootmatesRoutingModule],
  entryComponents: [MutualFootmateComponent]
})
export class ManageFootmatesModule {}
