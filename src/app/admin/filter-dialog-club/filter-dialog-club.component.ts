import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog-club',
  templateUrl: './filter-dialog-club.component.html',
  styleUrls: ['./filter-dialog-club.component.scss']
})
export class FilterDialogClubComponent implements OnInit {
  @Input() max: Date | null;
  filterForm: FormGroup;
  tomorrow = new Date();

  constructor(
    public dialogRef: MatDialogRef<FilterDialogClubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.filterForm = this.formBuilder.group({
      from: [this.data.from],
      to: [this.data.to],
      email: [this.data.email],
      name: [this.data.name],
      email_verified: [this.data.email_verified],
      profile_status: [this.data.profile_status]
    });
  }
}
