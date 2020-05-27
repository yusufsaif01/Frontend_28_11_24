import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TimelineComponent } from './timeline.component';
import { PostPopupComponent } from './post-popup/post-popup.component';
import { TimelineRoutingModule } from './timeline-routing.module';
import { DatePipe } from '@app/shared/pipes/date.pipe';

@NgModule({
  declarations: [TimelineComponent, PostPopupComponent, DatePipe],
  imports: [CommonModule, TimelineRoutingModule, SharedModule, CarouselModule],
  entryComponents: [PostPopupComponent]
})
export class TimelineModule {}
