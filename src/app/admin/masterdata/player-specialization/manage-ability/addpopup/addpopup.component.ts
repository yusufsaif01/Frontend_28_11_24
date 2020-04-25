import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-addpopup',
  templateUrl: './addpopup.component.html',
  styleUrls: ['./addpopup.component.scss']
})
export class AddpopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddpopupComponent>) {}
  // dailog close
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
