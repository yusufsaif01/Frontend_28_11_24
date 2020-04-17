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
      from: [''],
      to: [''],
      name: [''],
      email: [''],
      email_verified: [''],
      profile_status: ['']
    });
  }
}
