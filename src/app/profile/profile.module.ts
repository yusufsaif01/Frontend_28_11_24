import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { AddEditEmploymentContractComponent } from './add-edit-employment-contract/add-edit-employment-contract.component';
import { ViewEmploymentContractComponent } from './view-employment-contract/view-employment-contract.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { ViewEditProfileComponent } from './view-edit-profile/view-edit-profile.component';
import { PersonalDetailsComponent } from './view-edit-profile/personal-details/personal-details.component';
import { ProfessionalDetailsComponent } from './view-edit-profile/professional-details/professional-details.component';
import { DocumentsComponent } from './view-edit-profile/documents/documents.component';
import { EmploymentContractsComponent } from './view-edit-profile/employment-contracts/employment-contracts.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { VerificationComponent } from './view-edit-profile/verification/verification.component';

@NgModule({
  declarations: [
    ProfileComponent,
    AddEditEmploymentContractComponent,
    ViewEmploymentContractComponent,
    ViewEditProfileComponent,
    PersonalDetailsComponent,
    ProfessionalDetailsComponent,
    DocumentsComponent,
    EmploymentContractsComponent,
    PublicProfileComponent,
    VerificationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    NgxTrimDirectiveModule
  ],
  entryComponents: [VerificationComponent]
})
export class ProfileModule {}
