import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog-player',
  templateUrl: './filter-dialog-player.component.html',
  styleUrls: ['./filter-dialog-player.component.scss']
})
export class FilterDialogPlayerComponent implements OnInit {
  @Input() max: Date | null;
  filterForm: FormGroup;
  tomorrow = new Date();

  constructor(
    public dialogRef: MatDialogRef<FilterDialogPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      from: [this.data.from],
      to: [this.data.to],
      name: [this.data.name],
      type: [this.data.type],
      email: [this.data.email],
      position: [this.data.position],
      email_verified: [this.data.email_verified],
      profile_status: [this.data.profile_status]
    });
  }
  // fromDate = new Date(fromDate).toISOString()
  ngOnInit() {}
}
