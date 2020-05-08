import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-mutual-footmate',
  templateUrl: './mutual-footmate.component.html',
  styleUrls: ['./mutual-footmate.component.scss']
})
export class MutualFootmateComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MutualFootmateComponent>) {}

  // dailog Box close
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
