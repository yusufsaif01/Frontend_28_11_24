import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { RouterModule } from '@angular/router';
import { FrontendHeaderComponent } from './frontend-header/frontend-header.component';
import { FrontendSidebarComponent } from './frontend-sidebar/frontend-sidebar.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    FrontendHeaderComponent,
    FrontendSidebarComponent
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    FrontendHeaderComponent,
    FrontendSidebarComponent
  ]
})
export class PageComponentsModule {}
