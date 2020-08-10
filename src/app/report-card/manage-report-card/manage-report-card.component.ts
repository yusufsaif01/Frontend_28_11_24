import { Component, OnInit } from '@angular/core';
import { ManageReportCardService } from './manage-report-card.service';
import { untilDestroyed } from '@app/core';
import { environment } from '@env/environment';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-report-card',
  templateUrl: './manage-report-card.component.html',
  styleUrls: ['./manage-report-card.component.scss']
})
export class ManageReportCardComponent implements OnInit {
  constructor(
    private _manageReportCardService: ManageReportCardService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    // this.getReportCardList();
  }

  getReportCardList() {
    this._manageReportCardService
      .getReportCardList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          for (let i = 0; i < records.length; i++) {
            records[i]['avatar'] = environment.mediaUrl + records[i]['avatar'];
          }
          // this.dataSource = new MatTableDataSource(response.data.records);
        },
        error => {
          this._toastrService.error(error.error.message, 'Error');
        }
      );
  }

  ngOnDestroy() {}
}
