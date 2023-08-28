import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog-academy',
  templateUrl: './filter-dialog-academy.component.html',
  styleUrls: ['./filter-dialog-academy.component.scss']
})
export class FilterDialogAcademyComponent implements OnInit {
  @Input() max: Date | null;
  filterForm: FormGroup;
  tomorrow = new Date();

  constructor(
    public dialogRef: MatDialogRef<FilterDialogAcademyComponent>,
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
      name: [this.data.name],
      email: [this.data.email],
      email_verified: [this.data.email_verified],
      profile_status: [this.data.profile_status]
    });
  }
}
