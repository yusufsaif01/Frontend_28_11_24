import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NgxImageCompressService } from 'ngx-image-compress';
import { VerificationPopupComponent } from '@app/admin/verification-popup/verification-popup.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    PageComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    LoaderComponent,
    TableComponent,
    MasterTableComponent,
    PaginationComponent,
    TruncatePipe,
    TrimPipe,
    VerificationPopupComponent
  ],
  entryComponents: [VerificationPopupComponent],
  providers: [NgxImageCompressService],
  exports: [
    LoaderComponent,
    TruncatePipe,
    TrimPipe,
    PageComponentsModule,
    FlexLayoutModule,
    MaterialModule,
    TableComponent,
    MasterTableComponent,
    PaginationComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    VerificationPopupComponent
  ]
})
export class SharedModule {}
