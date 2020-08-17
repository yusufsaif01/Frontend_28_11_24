import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.scss']
})
export class VideoPopupComponent implements OnInit, OnDestroy {
  member_type = '';
  videoLength = {
    player: 2,
    timeline: 10,
    learning: 30,
    match: 150
  };
  constructor(
    public dialogRef: MatDialogRef<VideoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService
  ) {
    if (data.member_type) {
      this.member_type = data.member_type;
    }
  }

  ngOnInit() {}

  getUploadLength() {
    if (this.member_type === 'player') {
      return this.videoLength.player;
    }
  }

  ngOnDestroy() {}
}
