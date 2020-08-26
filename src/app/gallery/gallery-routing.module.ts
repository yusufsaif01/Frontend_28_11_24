import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { RoleGuardService } from '../core/authentication/role-guard.service';
import { extract, AuthenticationGuard } from '@app/core';
import { GalleryListingComponent } from './gallery-listing/gallery-listing.component';
import { GallerySingleComponent } from './gallery-single/gallery-single.component';

const appRoutes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    canActivate: [RoleGuardService, AuthenticationGuard],
    data: { expectedRole: ['player', 'club', 'academy'] },
    children: [
      {
        path: '',
        component: GalleryListingComponent,
        data: { title: extract('Gallery') }
      },
      {
        path: ':handle',
        component: GalleryListingComponent,
        data: { title: extract('Gallery') }
      },
      {
        path: 'gallery-view/:video_id',
        component: GallerySingleComponent,
        data: { title: extract('Gallery View') }
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {}
