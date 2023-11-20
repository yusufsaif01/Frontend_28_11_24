import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { GalleryComponent } from './gallery.component';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryListingComponent } from './gallery-listing/gallery-listing.component';
import { GallerySingleComponent } from './gallery-single/gallery-single.component';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    GalleryComponent,
    GalleryListingComponent,
    GallerySingleComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8133526594590676'
    })
  ]
})
export class GalleryModule {}
