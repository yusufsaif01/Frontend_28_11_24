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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NotFoundComponent } from './not-found/not-found.component';
import { LinkExpiredComponent } from './link-expired/link-expired.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { FilterComponent } from './filter/filter.component';
import { BackNavigationComponent } from './back-navigation/back-navigation.component';
import { FormsModule } from '@angular/forms';
import { CopyrightComponent } from './copyright/copyright.component';
import { CapitalizePipe } from './../pipes/capitalize.pipe';

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
    LeftPanelComponent,
    VideoPlayerComponent,
    FilterComponent,
    BackNavigationComponent,
    CopyrightComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    InfiniteScrollModule,
    FormsModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ContainerComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    LeftPanelComponent,
    VideoPlayerComponent,
    InfiniteScrollModule,
    FilterComponent,
    BackNavigationComponent,
    FormsModule,
    CopyrightComponent,
    CapitalizePipe
  ]
})
export class PageComponentsModule {}
