import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile.component';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { extract, AuthenticationGuard } from '@app/core';
import { AddEditEmploymentContractComponent } from './add-edit-employment-contract/add-edit-employment-contract.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [RoleGuardService, AuthenticationGuard],
    data: { expectedRole: ['player', 'club', 'academy'] },
    children: [
      {
        path: 'view',
        component: ViewProfileComponent,
        data: { title: extract('View Profile') }
      },
      {
        path: 'view/:handle',
        component: ViewProfileComponent,
        data: { title: extract('View Profile') }
      },
      {
        path: 'edit',
        component: EditProfileComponent,
        data: { title: extract('Edit Profile') }
      },
      {
        path: 'add-employment-contract',
        component: AddEditEmploymentContractComponent,

        data: { title: extract('Add New Contract') }
      },
      {
        path: 'edit-employment-contract/:id',
        component: AddEditEmploymentContractComponent,

        data: { title: extract('Edit Contract') }
      },
      { path: '**', component: ViewProfileComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
