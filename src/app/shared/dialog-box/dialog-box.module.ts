import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { StatusConfirmationComponent } from './status-confirmation/status-confirmation.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [StatusConfirmationComponent, DeleteConfirmationComponent],
  imports: [CommonModule, MaterialModule],
  exports: [],
  entryComponents: []
})
export class DialogBoxModule {}
