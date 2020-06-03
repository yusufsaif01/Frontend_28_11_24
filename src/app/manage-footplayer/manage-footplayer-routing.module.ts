import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { extract, AuthenticationGuard } from '@app/core';
import { ManageFootPlayerComponent } from './manage-footplayer.component';
import { FootPlayerComponent } from './foot-player/foot-player.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ManageFootPlayerComponent,
    canActivate: [RoleGuardService, AuthenticationGuard],
    data: { expectedRole: ['club', 'academy'] },
    children: [
      {
        path: '',
        component: FootPlayerComponent,
        data: { title: extract('Foot Player') }
      },
      { path: '**', component: FootPlayerComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ManageFootplayerRoutingModule {}
