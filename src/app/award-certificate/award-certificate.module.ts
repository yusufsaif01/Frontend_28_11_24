import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { AwardCertificateComponent } from './award-certificate.component';
import { EditAddPopupComponent } from './edit-add-popup/edit-add-popup.component';
import { AwardCertificateRoutingModule } from './award-certificate-routing.module';

@NgModule({
  declarations: [AwardCertificateComponent, EditAddPopupComponent],
  imports: [CommonModule, AwardCertificateRoutingModule, SharedModule],
  entryComponents: [EditAddPopupComponent]
})
export class AwardCertificateModule {}
