import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { extract, AuthenticationGuard } from '@app/core';
import { AddEditEmploymentContractComponent } from './add-edit-employment-contract/add-edit-employment-contract.component';
import { ViewEmploymentContractComponent } from './view-employment-contract/view-employment-contract.component';
import { ViewEditProfileComponent } from './view-edit-profile/view-edit-profile.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [RoleGuardService, AuthenticationGuard],
    data: { expectedRole: ['player', 'club', 'academy', 'admin'] },
    children: [
      {
        path: '',
        component: ViewEditProfileComponent,
        data: { title: extract('My Profile') }
      },
      {
        path: 'add-employment-contract',
        component: AddEditEmploymentContractComponent,
        data: { title: extract('Add new contract') }
      },
      {
        path: 'add-employment-contract/:send_to',
        component: AddEditEmploymentContractComponent,
        data: { title: extract('Add new contract') }
      },
      {
        path: 'edit-employment-contract/:contract_id',
        component: AddEditEmploymentContractComponent,
        data: { title: extract('Edit contract') }
      },
      {
        path: 'view-employment-contract/:id',
        component: ViewEmploymentContractComponent,
        data: { title: extract('View contract') }
      },
      {
        path: 'public',
        component: PublicProfileComponent,
        data: { title: extract('Public profile') }
      },
      {
        path: 'public/:user_id',
        component: PublicProfileComponent,
        data: { title: extract('Public profile') }
      },
      { path: '**', component: ViewEditProfileComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
