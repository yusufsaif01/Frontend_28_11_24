import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@app/shared';
import { ManagePlayerComponent } from './manage-player/manage-player.component';
import { FilterDialogPlayerComponent } from './filter-dialog-player/filter-dialog-player.component';
import { ManageClubComponent } from './manage-club/manage-club.component';
import { FilterDialogClubComponent } from './filter-dialog-club/filter-dialog-club.component';
import { ManageAcademyComponent } from './manage-academy/manage-academy.component';
import { FilterDialogAcademyComponent } from './filter-dialog-academy/filter-dialog-academy.component';
import { ManageLocationComponent } from './masterdata/manage-location/manage-location.component';
import { ManageStateComponent } from './masterdata/manage-location/manage-state/manage-state.component';
import { ManageCityComponent } from './masterdata/manage-location/manage-city/manage-city.component';
import { MemberTypeComponent } from './masterdata/member-type/member-type.component';
import { ManagePositionComponent } from './masterdata/player-specialization/manage-position/manage-position.component';
import { ManageAbilityComponent } from './masterdata/player-specialization/manage-ability/manage-ability.component';
import { ManageParametersComponent } from './masterdata/player-specialization/manage-ability/manage-parameters/manage-parameters.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    ManagePlayerComponent,
    FilterDialogPlayerComponent,
    ManageClubComponent,
    FilterDialogClubComponent,
    ManageAcademyComponent,
    FilterDialogAcademyComponent,
    ManageLocationComponent,
    ManageStateComponent,
    ManageCityComponent,
    MemberTypeComponent,
    ManagePositionComponent,
    ManageAbilityComponent,
    ManageParametersComponent,
    AdminComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  entryComponents: [
    FilterDialogPlayerComponent,
    FilterDialogClubComponent,
    FilterDialogAcademyComponent
  ]
})
export class AdminModule {}
