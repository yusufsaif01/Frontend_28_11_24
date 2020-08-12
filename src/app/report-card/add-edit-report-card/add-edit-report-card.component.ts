import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AddEditReportCardService } from './add-edit-report-card.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AddEditEmploymentContractService } from '@app/profile/add-edit-employment-contract/add-edit-employment-contract.service';
import { untilDestroyed } from '@app/core';
import { AdminService } from '@app/admin/admin.service';
import { SharedService } from '@app/shared/shared.service';

interface tab {
  ability_id: string;
  ability_name: string;
  attributes: {
    attribute_id: string;
    attribute_name: string;
    attribute_score?: string;
  }[];
}

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
  tabs: tab[] = [];
  currentTab: tab = {
    ability_id: '',
    ability_name: '',
    attributes: [
      {
        attribute_id: '',
        attribute_name: '',
        attribute_score: ''
      }
    ]
  };
  constructor(
    private _addEditReportCardService: AddEditReportCardService,
    private _employmentContractService: AddEditEmploymentContractService,
    // private _sharedService: AdminService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _sharedService: SharedService
  ) {
    this.createForm();
    this._activatedRoute.params.subscribe(param => {
      if (param.send_to) {
        this.send_to = param.send_to;
        this.getPlayerDetails(this.send_to);
      }
    });
  }

  ngOnInit() {
    this.getAbilityList();
  }

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

  getTab(val: string) {
    this.currentTab = this.tabs.find(tab => {
      return tab.ability_id === val;
    });
  }

  getAbilityList() {
    this._sharedService
      .getAbilityList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          let records = response.data.records;
          this.currentTab.ability_id = records[0].id;
          records.forEach(record => {
            let tab: tab = {
              ability_id: record.id,
              ability_name: record.name,
              attributes: []
            };
            let attribute: any = this.getAttributeListByAbility(record.id);
            if (attribute && attribute.length) {
              tab.attributes.push({
                attribute_id: attribute.id,
                attribute_name: attribute.name
              });
            }
            this.tabs.push(tab);
          });
        },
        error => {}
      );
  }

  getAttributeListByAbility(ability_id: string) {
    // this.tabs.forEach(tab => {
    this._sharedService
      .getAttributeListByAbility({
        ability_id
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          return response.data.records;
          // let tab = {}
          // tab = response.data
          // this.abilityName = .ability;
          // let records = response.data.records;
        },
        error => {}
      );
    // });
  }

  createForm() {}

  ngOnDestroy() {}
}
