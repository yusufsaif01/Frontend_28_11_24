import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryListingComponent } from './gallery-listing/gallery-listing.component';
import { GallerySingleComponent } from './gallery-single/gallery-single.component';
import { VideoPopupComponent } from '@app/timeline/video-popup/video-popup.component';

@NgModule({
  declarations: [
    GalleryComponent,
    GalleryListingComponent,
    GallerySingleComponent,
    VideoPopupComponent
  ],
  imports: [CommonModule, GalleryRoutingModule, SharedModule],
  entryComponents: [VideoPopupComponent]
})
export class GalleryModule {}
