import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog-club',
  templateUrl: './filter-dialog-club.component.html',
  styleUrls: ['./filter-dialog-club.component.scss']
})
export class FilterDialogClubComponent implements OnInit {
  filterForm: FormGroup;
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
      from: [''],
      to: [''],
      email: [''],
      name: [''],
      email_verified: [''],
      profile_status: ['']
    });
  }
}
