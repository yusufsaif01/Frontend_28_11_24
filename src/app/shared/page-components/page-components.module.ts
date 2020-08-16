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
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { CopyrightComponent } from './copyright/copyright.component';

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
    FilterComponent,
    CopyrightComponent
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
    InfiniteScrollModule,
    FilterComponent,
    FormsModule,
    CopyrightComponent
  ]
})
export class PageComponentsModule {}
