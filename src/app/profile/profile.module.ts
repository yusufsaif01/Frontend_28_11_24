import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
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

@NgModule({
  declarations: [
    ProfileComponent,
    ViewProfileComponent,
    EditProfileComponent,
    AddEditEmploymentContractComponent,
    ViewEmploymentContractComponent,
    ViewEditProfileComponent,
    PersonalDetailsComponent,
    ProfessionalDetailsComponent,
    DocumentsComponent,
    EmploymentContractsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    NgxTrimDirectiveModule
  ]
})
export class ProfileModule {}
