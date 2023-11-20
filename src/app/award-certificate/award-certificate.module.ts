import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { AwardCertificateComponent } from './award-certificate.component';
import { EditAddPopupComponent } from './edit-add-popup/edit-add-popup.component';
import { AwardCertificateRoutingModule } from './award-certificate-routing.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { AdsenseModule } from 'ng2-adsense';
@NgModule({
  declarations: [AwardCertificateComponent, EditAddPopupComponent],
  imports: [
    CommonModule,
    AwardCertificateRoutingModule,
    SharedModule,
    NgxTrimDirectiveModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8133526594590676'
    })
  ],
  entryComponents: [EditAddPopupComponent]
})
export class AwardCertificateModule {}
