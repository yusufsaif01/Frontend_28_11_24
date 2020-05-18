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
  pageNo: number = 1;
  pageSize: number = 8;
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

  getMutualFootmateList(scrolled?: string) {
    if (!scrolled) {
      this.pageNo = 1;
    }
    this.mutualFootmateService
      .getMutualFootmateList(this.data.id, {
        page_no: this.pageNo,
        page_size: this.pageSize
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        (response: any) => {
          let records = response.data.records;
          if (!scrolled) {
            this.mutualFootmate = records;
          } else {
            records.forEach((el: any) => {
              if (!this.mutualFootmate.includes(el)) {
                this.mutualFootmate.push(el);
              }
            });
          }
        },
        error => {
          this.toastrService.error('Error', error.error.message);
        }
      );
  }

  onScrollDown() {
    console.log('Scrolled Down');
    this.pageNo++;
    this.getMutualFootmateList('scrolled');
  }

  onScrollUp() {
    console.log('Scrolled Up');
  }
}
