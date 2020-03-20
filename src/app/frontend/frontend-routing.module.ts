import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendComponent } from './frontend.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from '@app/pages/dashboard-home/dashboard-home.component';

const appRoutes: Routes = [
  {
    path: 'frontend',
    component: FrontendComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      },
      { path: 'profile', loadChildren: '../user-profile/user-profile.module#UserProfileModule' },
      { path: 'dashboard', component: DashboardHomeComponent },
      { path: '**', component: DashboardHomeComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule {}
