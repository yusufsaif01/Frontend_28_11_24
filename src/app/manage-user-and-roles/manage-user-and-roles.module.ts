import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserAndRolesComponent } from './manage-user-and-roles.component';
import { BulkUpdateComponent } from './bulk-update/bulk-update.component';
import { EnrollUserComponent } from './enroll-user/enroll-user.component';
import { ManageUserAndRolesRoutingModule } from './manage-user-and-roles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListUserComponent } from './list-user/list-user.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManageUserAndRolesComponent, BulkUpdateComponent, EnrollUserComponent, ListUserComponent],
  imports: [CommonModule, FormsModule, SharedModule, ManageUserAndRolesRoutingModule]
})
export class ManageUserAndRolesModule {}
