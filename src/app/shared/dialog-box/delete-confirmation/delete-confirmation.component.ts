import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  private message: string = 'Are you sure?';
  private acceptText: string = 'Confirm';
  private rejectText: string = 'Cancel';

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
