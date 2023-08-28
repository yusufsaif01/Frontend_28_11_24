import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {
  ViewReportCardService,
  GetReportCardResponseContext
} from './view-report-card.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@app/core';
import { SharedService } from '@app/shared/shared.service';

export interface AbilityContext {
  ability_id: string;
  ability_name: string;
  attributes: {
    attribute_id: string;
    attribute_name: string;
    attribute_score?: number | string;
  }[];
}

@Component({
  selector: 'app-view-report-card',
  templateUrl: './view-report-card.component.html',
  styleUrls: ['./view-report-card.component.scss']
})
export class ViewReportCardComponent implements OnInit, OnDestroy {
  sidebar: boolean = false;
  mode: ProgressSpinnerMode = 'determinate';
  send_to = '';
  report_card_id = '';
  playerDetails: any = {};
  abilitiesArray: AbilityContext[] = [];
  selectedAbility: AbilityContext = {
    ability_id: '',
    ability_name: '',
    attributes: []
  };
  reportCardData: GetReportCardResponseContext['data'];

  constructor(
    private _viewReportCardService: ViewReportCardService,
    private _sharedService: SharedService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAbilityAttributeList();
    this._activatedRoute.params.subscribe(param => {
      if (param.report_card_id) {
        this.report_card_id = param.report_card_id;
        this.populateView();
      }
    });
  }

  populateView() {
    this._viewReportCardService
      .getReportCard({ report_card_id: this.report_card_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.reportCardData = response.data;
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  getTab(val: string) {
    this.selectedAbility = this.abilitiesArray.find(tab => {
      return tab.ability_id === val;
    });
  }

  getAbilityAttributeList() {
    this._sharedService
      .getAbilityAttributeList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.abilitiesArray = response.data.records.map(record => {
            return {
              ability_id: record.id,
              ability_name: record.name,
              attributes: record.attributes.length
                ? record.attributes.map(attribute => {
                    return {
                      attribute_id: attribute.id,
                      attribute_name: attribute.name
                      // attribute_score: ''
                    };
                  })
                : []
            };
          });

          this.initializeAbilities();
        },
        error => {}
      );
  }

  initializeAbilities() {
    this.selectedAbility = this.abilitiesArray[0];
  }

  ngOnDestroy() {}
}
