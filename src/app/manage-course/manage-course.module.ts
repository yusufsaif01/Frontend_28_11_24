import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCourseComponent } from './manage-course.component';
import { ManageCourseRoutingModule } from './manage-course-routing.module';
import { CourseListingComponent } from './course-listing/course-listing.component';
import { SharedModule } from '@app/shared';
import { CreateEditCourseComponent } from './create-edit-course/create-edit-course.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { SelectChapterComponent } from './select-chapter/select-chapter.component';

@NgModule({
  declarations: [ManageCourseComponent, CourseListingComponent, CreateEditCourseComponent, SelectChapterComponent],
  imports: [CommonModule, ManageCourseRoutingModule, SharedModule, CKEditorModule]
})
export class ManageCourseModule {}
