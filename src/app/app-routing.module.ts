import { NgModule } from '@angular/core';
import { Routes, RouterModule
  // , PreloadAllModules
 } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { Shell } from '@app/shell/shell.service';
// import { HomeComponent } from './pages/home/home.component';
// import {} from './login/login.component'

const routes: Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent
  },
  // Shell.childRoutes([{ path: 'test', loadChildren: './about/about.module#AboutModule' }]),
  
  // Shell.childRoutes([{ path: 'about', loadChildren: './about/about.module#AboutModule' }]),
  // Shell.childRoutes([
  //   { path: 'users', loadChildren: './manage-user-and-roles/manage-user-and-roles.module#ManageUserAndRolesModule' }
  // ]),
  // Shell.childRoutes([
  //   {
  //     path: 'manage-question-content',
  //     loadChildren: './manage-question-content/manage-question-content.module#ManageQuestionContentModule'
  //   }
  // ]),
  // Shell.childRoutes([
  //   {
  //     path: 'manage-chapter',
  //     loadChildren: './manage-chapter/manage-chapter.module#ManageChapterModule'
  //   }
  // ]),
  // Shell.childRoutes([
  //   {
  //     path: 'courses',
  //     loadChildren: './manage-course/manage-course.module#ManageCourseModule'
  //   }
  // ]),
  // Shell.childRoutes([
  //   {
  //     path: 'knowledge-repo',
  //     loadChildren: './knowledge-repository/knowledge-repository.module#KnowledgeRepositoryModule'
  //   }
  // ]),

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    // , { preloadingStrategy: PreloadAllModules }
    )],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
