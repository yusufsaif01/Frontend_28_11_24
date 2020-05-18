import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { FootMatesComponent } from './foot-mates/foot-mates.component';
import { FootRequestComponent } from './foot-request/foot-request.component';
import { MutualFootmateComponent } from './mutual-footmate/mutual-footmate.component';
import { ManageFootmatesComponent } from './manage-footmates.component';
import { ManageFootmatesRoutingModule } from './manage-footmates-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    FootMatesComponent,
    FootRequestComponent,
    MutualFootmateComponent,
    ManageFootmatesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManageFootmatesRoutingModule,
    InfiniteScrollModule
  ],
  entryComponents: [MutualFootmateComponent]
})
export class ManageFootmatesModule {}
