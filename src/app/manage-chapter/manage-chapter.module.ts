import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageChapterComponent } from './manage-chapter.component';
import { ManageChapterRoutingModule } from './manage-chapter-routing.module';
import { ChapterListingComponent } from './chapter-listing/chapter-listing.component';

@NgModule({
  declarations: [ManageChapterComponent, ChapterListingComponent],
  imports: [CommonModule, ManageChapterRoutingModule]
})
export class ManageChapterModule {}
