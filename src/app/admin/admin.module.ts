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
import { ManageDistrictComponent } from './masterdata/manage-location/manage-district/manage-district.component';
import { MemberTypeComponent } from './masterdata/member-type/member-type.component';
import { ManagePositionComponent } from './masterdata/player-specialization/manage-position/manage-position.component';
import { ManageAbilityComponent } from './masterdata/player-specialization/manage-ability/manage-ability.component';
import { ManageAttributeComponent } from './masterdata/player-specialization/manage-ability/manage-attribute/manage-attribute.component';
import { AdminComponent } from './admin.component';
import { DocumentVerificationComponent } from './document-verification/document-verification.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ManagePrivacyComponent } from './manage-privacy/manage-privacy.component';
import { AddEditPopupComponent } from './manage-privacy/add-edit-popup/add-edit-popup.component';

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
    ManageDistrictComponent,
    MemberTypeComponent,
    ManagePositionComponent,
    ManageAbilityComponent,
    ManageAttributeComponent,
    AdminComponent,
    DocumentVerificationComponent,
    ManagePrivacyComponent,
    AddEditPopupComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxTrimDirectiveModule
  ],
  entryComponents: [
    FilterDialogPlayerComponent,
    FilterDialogClubComponent,
    FilterDialogAcademyComponent
  ]
})
export class AdminModule {}
