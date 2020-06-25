import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  public header: string = 'Please Confirm';
  public message: string = 'Are you sure you want to delete the user?';
  public acceptText: string = 'Confirm';
  public rejectText: string = 'Cancel';
  public inputbox: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data.header) {
      this.header = data.header;
    }
    if (data.message) {
      this.message = data.message;
    }
    if (data.acceptText) {
      this.acceptText = data.acceptText;
    }
    if (data.rejectText) {
      this.rejectText = data.rejectText;
    }
    if (data.inputbox) {
      this.inputbox = data.inputbox;
    }
  }

  ngOnInit() {}

  event() {}
}
