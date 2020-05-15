import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MutualFootmateService } from './mutual-footmate-service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-mutual-footmate',
  templateUrl: './mutual-footmate.component.html',
  styleUrls: ['./mutual-footmate.component.scss']
})
export class MutualFootmateComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {}

  // dailog Box close
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}

  getMutualFootmateList() {
    this.mutualFootmateService
      .getMutualFootmateList(this.data.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.mutualFootmate = response.data.records;
        },
        error => {
          this.toastrService.error('Error', error.error.message);
        }
      );
  }
}
