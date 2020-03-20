import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageQuestionContentComponent } from './manage-question-content.component';
import { ManageQuestionContentRoutingModule } from './manage-question-content-routing.module';
import { SharedModule } from '@app/shared';
import { QuestionContentListComponent } from './question-content-list/question-content-list.component';
import { CreateAndUpdateQuestionComponent } from './create-and-update-question/create-and-update-question.component';
import { EnterLinkComponent } from './enter-link/enter-link.component';

@NgModule({
  declarations: [
    ManageQuestionContentComponent,
    QuestionContentListComponent,
    CreateAndUpdateQuestionComponent,
    EnterLinkComponent
  ],
  imports: [CommonModule, SharedModule, ManageQuestionContentRoutingModule],
  entryComponents: [EnterLinkComponent]
})
export class ManageQuestionContentModule {}
