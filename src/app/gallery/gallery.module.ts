import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryListingComponent } from './gallery-listing/gallery-listing.component';
import { GallerySingleComponent } from './gallery-single/gallery-single.component';

@NgModule({
  declarations: [
    GalleryComponent,
    GalleryListingComponent,
    GallerySingleComponent
  ],
  imports: [CommonModule, GalleryRoutingModule, SharedModule]
})
export class GalleryModule {}
