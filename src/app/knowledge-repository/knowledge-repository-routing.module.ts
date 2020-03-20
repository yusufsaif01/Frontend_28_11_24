import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeRepositoryComponent } from './knowledge-repository.component';
import { KnowledgeRepoListComponent } from './knowledge-repo-list/knowledge-repo-list.component';
import { ContentComponent } from './content/content.component';

const appRoutes: Routes = [
  {
    path: '',
    component: KnowledgeRepositoryComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      { path: 'list', component: KnowledgeRepoListComponent },
      { path: 'add', component: ContentComponent },
      { path: 'edit', component: ContentComponent },
      { path: '**', component: KnowledgeRepoListComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class KnowledgeRepositoryRoutingModule {}
