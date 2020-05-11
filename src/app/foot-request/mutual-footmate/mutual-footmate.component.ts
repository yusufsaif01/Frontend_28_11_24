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
    this.mutualFootmateService
      .getMutualFootmateList('6ff5a3fd-f56d-4417-bf38-afebf4efade6')
      .subscribe(
        response => {
          console.log('Mutual Footmates', response);
        },
        error => {
          console.log(error);
        }
      );
  }
}
