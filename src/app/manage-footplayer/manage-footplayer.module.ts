import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageFootPlayerComponent } from './manage-footplayer.component';
import { SharedModule } from '@app/shared';
import { ManageFootplayerRoutingModule } from './manage-footplayer-routing.module';
import { FootPlayerComponent } from './foot-player/foot-player.component';

@NgModule({
  declarations: [ManageFootPlayerComponent, FootPlayerComponent],
  imports: [CommonModule, SharedModule, ManageFootplayerRoutingModule]
})
export class ManageFootplayerModule {}
