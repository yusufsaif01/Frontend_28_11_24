import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { extract, AuthenticationGuard } from '@app/core';
import { ManageFootPlayerComponent } from './manage-footplayer.component';
import { FootPlayerComponent } from './foot-player/foot-player.component';
import { ClubAcademyFootplayerComponent } from './club-academy-footplayer/club-academy-footplayer.component';
import { ContractManagementComponent } from './contract-management/contract-management.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ManageFootPlayerComponent,
    canActivate: [RoleGuardService, AuthenticationGuard],
    data: { expectedRole: ['player', 'club', 'academy', 'coache'] },
    children: [
      {
        path: '',
        component: FootPlayerComponent,
        data: { title: extract('FooTPlayers') }
      },

      {
        path: 'club-academy',
        component: ClubAcademyFootplayerComponent,
        data: { title: extract('FooTPlayers') }
      },
      {
        path: 'club-academy/:handle',
        component: ClubAcademyFootplayerComponent,
        data: { title: extract('FooTPlayers') }
      },
      {
        path: 'contract-management',
        component: ContractManagementComponent,
        data: { title: extract('Contract management') }
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
