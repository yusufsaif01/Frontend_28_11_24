import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MutualFootmateService } from './mutual-footmate-service';
import { environment } from '@env/environment.prod';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mutual-footmate',
  templateUrl: './mutual-footmate.component.html',
  styleUrls: ['./mutual-footmate.component.scss']
})
export class MutualFootmateComponent implements OnInit {
  mutualFootmate: any[] = [];
  baseUrl: string = '';
  constructor(
    public dialogRef: MatDialogRef<MutualFootmateComponent>,
    private mutualFootmateService: MutualFootmateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService
  ) {
    this.baseUrl = environment.mediaUrl;
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
        this.mutualFootmate = response.data.records;
      },
      error => {
        this.toastrService.error('Error', error.error.message);
      }
    );
  }
}
