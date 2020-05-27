import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimelineComponent } from './timeline.component';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { extract, AuthenticationGuard } from '@app/core';

const appRoutes: Routes = [
  {
    path: '',
    component: TimelineComponent,
    canActivate: [RoleGuardService, AuthenticationGuard],
    data: { expectedRole: ['player', 'club', 'academy'] },
    children: [
      {
        path: '',
        component: TimelineComponent,
        data: { title: extract('Timeline') }
      },
      { path: '**', component: TimelineComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule {}
