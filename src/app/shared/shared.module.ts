import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { LoaderComponent } from './loader/loader.component';
import { PageComponentsModule } from './page-components/page-components.module';
import { TableComponent } from './table/table.component';
import { RouterModule } from '@angular/router';

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
  declarations: [LoaderComponent, TableComponent],
  exports: [
    LoaderComponent,
    PageComponentsModule,
    FlexLayoutModule,
    MaterialModule,
    TableComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule {}
