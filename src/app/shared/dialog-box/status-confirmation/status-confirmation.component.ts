import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-status-confirmation',
  templateUrl: './status-confirmation.component.html',
  styleUrls: ['./status-confirmation.component.scss']
})
export class StatusConfirmationComponent implements OnInit {
  public message: string = 'Are you sure you want to modify the status?';
  public acceptText: string = 'Confirm';
  public rejectText: string = 'Cancel';

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data.message) {
      this.message = data.message;
    }
    if (data.acceptText) {
      this.acceptText = data.acceptText;
    }
    if (data.rejectText) {
      this.rejectText = data.rejectText;
    }
  }

  ngOnInit() {}

  event() {}
}
