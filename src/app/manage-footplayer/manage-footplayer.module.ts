import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageFootPlayerComponent } from './manage-footplayer.component';
import { SharedModule } from '@app/shared';
import { ManageFootplayerRoutingModule } from './manage-footplayer-routing.module';
import { FootPlayerComponent } from './foot-player/foot-player.component';
import { AddFootplayerComponent } from './foot-player/add-footplayer/add-footplayer.component';
import { ClubAcademyFootplayerComponent } from './club-academy-footplayer/club-academy-footplayer.component';
import { ContractManagementComponent } from './contract-management/contract-management.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

@NgModule({
  declarations: [
    ManageFootPlayerComponent,
    FootPlayerComponent,
    AddFootplayerComponent,
    ClubAcademyFootplayerComponent,
    ContractManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManageFootplayerRoutingModule,
    NgxTrimDirectiveModule
  ],
  entryComponents: [AddFootplayerComponent]
})
export class ManageFootplayerModule {}
