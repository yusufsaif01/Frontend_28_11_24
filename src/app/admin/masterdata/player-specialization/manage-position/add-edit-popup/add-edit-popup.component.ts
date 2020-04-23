import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-popup',
  templateUrl: './add-edit-popup.component.html',
  styleUrls: ['./add-edit-popup.component.scss']
})
export class AddEditPopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddEditPopupComponent>) {}

  // dailog close
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
