import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './loader/loader.component';
import { PageComponentsModule } from './page-components/page-components.module';
import { TableComponent } from './table/table.component';
import { MasterTableComponent } from './master-table/master-table.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { MaskPipe } from './pipes/mask.pipe';
import { NgxImageCompressService } from 'ngx-image-compress';
import { VerificationPopupComponent } from '@app/shared/verification-popup/verification-popup.component';
import { GridSearchBoxComponent } from './grid-search-box/grid-search-box.component';
import { TextSectionComponent } from '@app/core/authentication/text-section/text-section.component';
import { PasswordDirective } from '@app/shared/directives/show-hide-password/password.directive';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    PageComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxTrimDirectiveModule
  ],
  declarations: [
    LoaderComponent,
    TableComponent,
    MasterTableComponent,
    PaginationComponent,
    TruncatePipe,
    TrimPipe,
    VerificationPopupComponent,
    GridSearchBoxComponent,
    TextSectionComponent,
    PasswordDirective
  ],
  entryComponents: [VerificationPopupComponent],
  providers: [NgxImageCompressService, DatePipe],
  exports: [
    LoaderComponent,
    TruncatePipe,
    TrimPipe,
    MaskPipe,
    PageComponentsModule,
    FlexLayoutModule,
    MaterialModule,
    TableComponent,
    MasterTableComponent,
    PaginationComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    VerificationPopupComponent,
    GridSearchBoxComponent,
    TextSectionComponent,
    PasswordDirective
  ]
})
export class SharedModule {}
