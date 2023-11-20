import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { MatInputModule } from '@angular/material/input';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AdBannerModule } from '../ad-banner/ad-banner.module';
import { AdsenseModule } from 'ng2-adsense';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule,
    MatInputModule,
    AdBannerModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8133526594590676'
    })
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
