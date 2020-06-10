import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-verification-popup',
  templateUrl: './verification-popup.component.html',
  styleUrls: ['./verification-popup.component.scss']
})
export class VerificationPopupComponent implements OnInit {
  public header: string = 'Please confirm';
  public message: string = '';
  public acceptText: string = 'Confirm';
  public rejectText: string = 'Cancel';
  disApprove: boolean = false;
  disApproveReason: string = '';
  imageMode: boolean = false;
  imageURL: string = '';

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data.imageURL) {
      this.imageMode = true;
      this.imageURL = data.imageURL;
    }
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
    if (data.header === 'Disapprove') {
      this.disApprove = true;
    }
  }

  ngOnInit() {}

  cofirmDialog() {
    if (this.disApprove) {
      this.dialogRef.close(this.disApproveReason);
    } else {
      this.dialogRef.close(true);
    }
  }
}
