import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TimelineComponent } from './timeline.component';
import { PostPopupComponent } from './post-popup/post-popup.component';
import { TimelineRoutingModule } from './timeline-routing.module';
import { AdsenseModule } from 'ng2-adsense';
import { PlayerSuggestionComponent } from './player-suggestion/player-suggestion.component';
import { MsgPopupComponent } from './msg-popup/msg-popup.component';

@NgModule({
  declarations: [
    TimelineComponent,
    PostPopupComponent,
    PlayerSuggestionComponent,
    MsgPopupComponent
  ],
  imports: [
    CommonModule,
    TimelineRoutingModule,
    SharedModule,
    CarouselModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8133526594590676'
    })
  ],
  entryComponents: [PostPopupComponent, MsgPopupComponent]
})
export class TimelineModule {}
