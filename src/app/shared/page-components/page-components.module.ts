import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
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
  Twitter,
  User,
  Lock,
  AtSign,
  PhoneCall,
  MapPin,
  Clock,
  Star,
  UserPlus,
  Share2,
  Video,
  File,
  Edit,
  Plus
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
  Twitter,
  User,
  Lock,
  AtSign,
  PhoneCall,
  MapPin,
  Clock,
  Star,
  UserPlus,
  Share2,
  Video,
  File,
  Edit,
  Plus
};

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    AdminHeaderComponent,
    AdminSidebarComponent
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
    AdminHeaderComponent,
    AdminSidebarComponent,
    FeatherModule
  ]
})
export class PageComponentsModule {}
