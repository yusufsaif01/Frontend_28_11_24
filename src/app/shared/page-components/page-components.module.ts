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
import { FeatherModule } from 'angular-feather';
import {
  Camera,
  Heart,
  Github,
  Users,
  Crosshair,
  MessageSquare,
  Bell,
  AlertCircle,
  Image,
  Delete,
  Trash2,
  Facebook,
  Instagram,
  Youtube,
  Twitter
} from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github,
  Users,
  Crosshair,
  MessageSquare,
  Bell,
  AlertCircle,
  Image,
  Delete,
  Trash2,
  Facebook,
  Instagram,
  Youtube,
  Twitter
};

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    FrontendHeaderComponent,
    FrontendSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    FrontendHeaderComponent,
    FrontendSidebarComponent,
    FeatherModule
  ]
})
export class PageComponentsModule {}
