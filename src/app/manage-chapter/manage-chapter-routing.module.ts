import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManageChapterComponent } from './manage-chapter.component';
import { ChapterListingComponent } from './chapter-listing/chapter-listing.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ManageChapterComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      { path: 'list', component: ChapterListingComponent },
      { path: '**', component: ChapterListingComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ManageChapterRoutingModule {}
