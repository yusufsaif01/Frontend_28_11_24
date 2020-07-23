import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { extract, AuthenticationGuard } from '@app/core';
import { AddEditEmploymentContractComponent } from './add-edit-employment-contract/add-edit-employment-contract.component';
import { ViewEmploymentContractComponent } from './view-employment-contract/view-employment-contract.component';
import { ViewEditProfileComponent } from './view-edit-profile/view-edit-profile.component';

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
        data: { title: extract('Add New Contract') }
      },
      {
        path: 'add-employment-contract/:send_to',
        component: AddEditEmploymentContractComponent,
        data: { title: extract('Add New Contract') }
      },
      {
        path: 'edit-employment-contract/:contract_id',
        component: AddEditEmploymentContractComponent,
        data: { title: extract('Edit Contract') }
      },
      {
        path: 'view-employment-contract/:id',
        component: ViewEmploymentContractComponent,
        data: { title: extract('View Contract') }
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
