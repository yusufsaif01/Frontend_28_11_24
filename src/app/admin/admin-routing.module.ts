import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagePlayerComponent } from './manage-player/manage-player.component';
import { ManageClubComponent } from './manage-club/manage-club.component';
import { ManageAcademyComponent } from './manage-academy/manage-academy.component';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { ManageLocationComponent } from './masterdata/manage-location/manage-location.component';
import { ManageStateComponent } from './masterdata/manage-location/manage-state/manage-state.component';
import { ManageDistrictComponent } from './masterdata/manage-location/manage-district/manage-district.component';
import { MemberTypeComponent } from './masterdata/member-type/member-type.component';
import { ManagePositionComponent } from './masterdata/player-specialization/manage-position/manage-position.component';
import { ManageAbilityComponent } from './masterdata/player-specialization/manage-ability/manage-ability.component';
import { ManageParametersComponent } from './masterdata/player-specialization/manage-ability/manage-parameters/manage-parameters.component';
import { AdminComponent } from './admin.component';
import { extract, AuthenticationGuard } from '@app/core';
import { DocumentVerificationComponent } from './document-verification/document-verification.component';

const appRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [RoleGuardService, AuthenticationGuard],
    data: { expectedRole: ['admin'] },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'manage-player'
      },
      {
        path: 'manage-player',
        component: ManagePlayerComponent,
        data: { title: extract('Manage Player') }
      },
      {
        path: 'manage-club',
        component: ManageClubComponent,
        data: { title: extract('Manage Club') }
      },
      {
        path: 'manage-academy',
        component: ManageAcademyComponent,
        data: { title: extract('Manage Academy') }
      },
      {
        path: 'document-verification/:id/:member_type',
        component: DocumentVerificationComponent,
        data: { title: extract('Document Verification') }
      },
      {
        path: 'masterdata-location',
        component: ManageLocationComponent,
        data: { title: extract('Manage Location') }
      },

      {
        path: 'masterdata-state/:id',
        component: ManageStateComponent,
        data: { title: extract('Manage State') }
      },
      {
        path: 'masterdata-district/:id',
        component: ManageDistrictComponent,
        data: { title: extract('Manage District') }
      },

      {
        path: 'masterdata-membertype',
        component: MemberTypeComponent,
        data: { title: extract('Member Type') }
      },

      {
        path: 'masterdata-position',
        component: ManagePositionComponent,
        data: { title: extract('Manage Position') }
      },

      {
        path: 'masterdata-ability',
        component: ManageAbilityComponent,
        data: { title: extract('Manage Ability') }
      },

      {
        path: 'masterdata-parameter/:id',
        component: ManageParametersComponent,
        data: { title: extract('Manage Parameter') }
      },
      { path: '**', component: ManagePlayerComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
