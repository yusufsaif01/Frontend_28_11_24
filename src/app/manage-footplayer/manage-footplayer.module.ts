import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageFootPlayerComponent } from './manage-footplayer.component';
import { SharedModule } from '@app/shared';
import { ManageFootplayerRoutingModule } from './manage-footplayer-routing.module';
import { FootPlayerComponent } from './foot-player/foot-player.component';
import { AddFootplayerComponent } from './foot-player/add-footplayer/add-footplayer.component';

@NgModule({
  declarations: [
    ManageFootPlayerComponent,
    FootPlayerComponent,
    AddFootplayerComponent
  ],
  imports: [CommonModule, SharedModule, ManageFootplayerRoutingModule],
  entryComponents: [AddFootplayerComponent]
})
export class ManageFootplayerModule {}
