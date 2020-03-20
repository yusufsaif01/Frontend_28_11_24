import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManageCourseComponent } from './manage-course.component';
import { CourseListingComponent } from './course-listing/course-listing.component';
import { CreateEditCourseComponent } from './create-edit-course/create-edit-course.component';
import { SelectChapterComponent } from './select-chapter/select-chapter.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ManageCourseComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      { path: 'list', component: CourseListingComponent },
      { path: 'create', component: CreateEditCourseComponent },
      { path: 'edit', component: CreateEditCourseComponent },
      { path: 'select-chapter', component: SelectChapterComponent },
      { path: '**', component: CourseListingComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ManageCourseRoutingModule {}
