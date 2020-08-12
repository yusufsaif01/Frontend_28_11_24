import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AddEditReportCardService } from './add-edit-report-card.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AddEditEmploymentContractService } from '@app/profile/add-edit-employment-contract/add-edit-employment-contract.service';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-add-edit-report-card',
  templateUrl: './add-edit-report-card.component.html',
  styleUrls: ['./add-edit-report-card.component.scss']
})
export class AddEditReportCardComponent implements OnInit, OnDestroy {
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  send_to = '';
  playerDetails: any = {};

  constructor(
    private _addEditReportCardService: AddEditReportCardService,
    private _employmentContractService: AddEditEmploymentContractService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.createForm();
    this._activatedRoute.params.subscribe(param => {
      if (param.send_to) {
        this.send_to = param.send_to;
        this.getPlayerDetails(this.send_to);
      }
    });
  }

  ngOnInit() {}

  getPlayerDetails(player_id: string) {
    this._employmentContractService
      .getPlayerDetails({ user_id: player_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.playerDetails = response.data;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  createForm() {}

  ngOnDestroy() {}
}
