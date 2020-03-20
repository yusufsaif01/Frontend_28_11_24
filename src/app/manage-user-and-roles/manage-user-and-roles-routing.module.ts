import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserAndRolesComponent } from './manage-user-and-roles.component';
import { EnrollUserComponent } from './enroll-user/enroll-user.component';
import { BulkUpdateComponent } from './bulk-update/bulk-update.component';
import { ListUserComponent } from './list-user/list-user.component';
import { extract } from '@app/core';

const appRoutes: Routes = [
  {
    path: '',
    component: ManageUserAndRolesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      { path: 'list', component: ListUserComponent },
      { path: 'import', component: BulkUpdateComponent },
      { path: 'enroll', component: EnrollUserComponent },
      { path: 'edit', component: EnrollUserComponent },
      { path: '**', component: ListUserComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ManageUserAndRolesRoutingModule {}
