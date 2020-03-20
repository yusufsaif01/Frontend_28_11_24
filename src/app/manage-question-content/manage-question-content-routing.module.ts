import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageQuestionContentComponent } from './manage-question-content.component';
import { Routes, RouterModule } from '@angular/router';
import { QuestionContentListComponent } from './question-content-list/question-content-list.component';
import { CreateAndUpdateQuestionComponent } from './create-and-update-question/create-and-update-question.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ManageQuestionContentComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      { path: 'list', component: QuestionContentListComponent },
      { path: 'create', component: CreateAndUpdateQuestionComponent },
      { path: 'update', component: CreateAndUpdateQuestionComponent },
      { path: '**', component: QuestionContentListComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ManageQuestionContentRoutingModule {}
