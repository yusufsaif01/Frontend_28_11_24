import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddEditReportCardService } from './add-edit-report-card.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-report-card',
  templateUrl: './add-edit-report-card.component.html',
  styleUrls: ['./add-edit-report-card.component.scss']
})
export class AddEditReportCardComponent implements OnInit, OnDestroy {
  constructor(
    private _addEditReportCardService: AddEditReportCardService,
    private _toastrService: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {}

  ngOnDestroy() {}
}
