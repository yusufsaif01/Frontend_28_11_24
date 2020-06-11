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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {
  Camera,
  Heart,
  Trash,
  ThumbsUp,
  Github,
  Mail,
  Users,
  Crosshair,
  MessageSquare,
  Bell,
  AlertCircle,
  CheckCircle,
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
  Plus,
  LogOut,
  ChevronDown,
  Search,
  Award,
  Home,
  UserCheck,
  UserX,
  Send,
  Info,
  Settings,
  FileText
} from 'angular-feather/icons';
import { NotFoundComponent } from './not-found/not-found.component';
import { LinkExpiredComponent } from './link-expired/link-expired.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';

const icons = {
  Camera,
  Heart,
  Trash,
  ThumbsUp,
  Github,
  Mail,
  Users,
  Crosshair,
  MessageSquare,
  Bell,
  AlertCircle,
  CheckCircle,
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
  Plus,
  LogOut,
  ChevronDown,
  Search,
  Award,
  Home,
  UserCheck,
  UserX,
  Send,
  Info,
  Settings,
  FileText
};

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    NotFoundComponent,
    LinkExpiredComponent,
    LeftPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FeatherModule.pick(icons),
    InfiniteScrollModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    LeftPanelComponent,
    FeatherModule,
    InfiniteScrollModule
  ]
})
export class PageComponentsModule {}
