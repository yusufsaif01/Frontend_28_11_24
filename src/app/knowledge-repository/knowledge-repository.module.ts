import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgeRepositoryComponent } from './knowledge-repository.component';
import { KnowledgeRepoListComponent } from './knowledge-repo-list/knowledge-repo-list.component';
import { ContentComponent } from './content/content.component';
import { KnowledgeRepositoryRoutingModule } from './knowledge-repository-routing.module';
import { SharedModule } from '@app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [KnowledgeRepositoryComponent, KnowledgeRepoListComponent, ContentComponent],
  imports: [
    CommonModule,
    SharedModule,
    KnowledgeRepositoryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule
  ]
})
export class KnowledgeRepositoryModule {}
