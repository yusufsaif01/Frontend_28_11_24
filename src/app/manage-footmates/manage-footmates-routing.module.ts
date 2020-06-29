import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FootMatesComponent } from './foot-mates/foot-mates.component';
import { FootRequestComponent } from './foot-request/foot-request.component';
import { MutualFootmateComponent } from './mutual-footmate/mutual-footmate.component';
import { ManageFootmatesComponent } from './manage-footmates.component';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { extract, AuthenticationGuard } from '@app/core';

const appRoutes: Routes = [
  {
    path: '',
    component: ManageFootmatesComponent,
    canActivate: [RoleGuardService, AuthenticationGuard],
    data: { expectedRole: ['player'] },
    children: [
      {
        path: 'foot-requests',
        component: FootRequestComponent,
        data: { title: extract('FootRequests') }
      },
      {
        path: 'foot-mates',
        component: FootMatesComponent,
        data: { title: extract('FootMates') }
      },
      { path: '**', component: FootRequestComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ManageFootmatesRoutingModule {}
