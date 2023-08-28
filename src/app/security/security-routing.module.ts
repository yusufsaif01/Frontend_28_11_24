import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { extract } from '@app/core';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    data: { title: extract('Security') }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}
