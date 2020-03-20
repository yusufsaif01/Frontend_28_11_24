import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';

import { ShellComponent } from './shell.component';
import { SharedModule } from '@app/shared';
import { DashboardHomeComponent } from '@app/pages/dashboard-home/dashboard-home.component';

@NgModule({
  imports: [CommonModule, TranslateModule, FlexLayoutModule, MaterialModule, RouterModule, SharedModule],
  declarations: [ShellComponent, DashboardHomeComponent]
})
export class ShellModule {}
