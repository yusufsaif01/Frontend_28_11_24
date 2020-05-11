import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MutualFootmateService } from './mutual-footmate-service';

@Component({
  selector: 'app-mutual-footmate',
  templateUrl: './mutual-footmate.component.html',
  styleUrls: ['./mutual-footmate.component.scss']
})
export class MutualFootmateComponent implements OnInit {
  mutualFootmate: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<MutualFootmateComponent>,
    private mutualFootmateService: MutualFootmateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getMutualFootmateList();
  }

  // dailog Box close
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}

  getMutualFootmateList() {
    this.mutualFootmateService.getMutualFootmateList(this.data.id).subscribe(
      response => {
        console.log('Mutual Footmates', response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
