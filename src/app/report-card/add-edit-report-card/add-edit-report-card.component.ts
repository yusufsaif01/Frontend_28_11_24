import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { AddEditReportCardService } from './add-edit-report-card.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AddEditEmploymentContractService } from '@app/profile/add-edit-employment-contract/add-edit-employment-contract.service';
import { untilDestroyed } from '@app/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '@app/shared/shared.service';

interface AbilityContext {
  ability_id: string;
  ability_name: string;
  attributes: {
    attribute_id: string;
    attribute_name: string;
    attribute_score?: number;
  }[];
}

@Component({
  selector: 'app-add-edit-report-card',
  templateUrl: './add-edit-report-card.component.html',
  styleUrls: ['./add-edit-report-card.component.scss']
})
export class AddEditReportCardComponent implements OnInit, OnDestroy {
  addEditReportForm: FormGroup;
  abilities: FormArray;
  attributes: FormArray;
  mode: ProgressSpinnerMode = 'determinate';
  send_to = '';
  playerDetails: any = {};
  abilitiesArray: AbilityContext[] = [];
  selectedAbility: AbilityContext = {
    ability_id: '',
    ability_name: '',
    attributes: []
  };
  constructor(
    private _addEditReportCardService: AddEditReportCardService,
    private _employmentContractService: AddEditEmploymentContractService,
    private _formBuilder: FormBuilder,
    private _sharedService: SharedService,
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

  ngOnInit() {
    this.getAbilityAttributeList();
    this.setValidator();
  }

  setValidator() {
    let abilities = this.addEditReportForm.get('abilities') as FormArray;

    console.log(abilities);
    console.log(abilities.controls);
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
                      attribute_name: attribute.name,
                      attribute_score: 0
                    };
                  })
                : []
            };
          });

          this.abilitiesArray.forEach(ability => {
            this.populateAbilityControl(ability);
          });
          this.selectedAbility = this.abilitiesArray[0];
        },
        error => {}
      );
  }
  prepareAttributeControl = (
    attributes?: {
      attribute_id: string;
      attribute_name: string;
      attribute_score?: number;
    }[]
  ) => {
    attributes.forEach(data => {
      if (data !== undefined && Object.keys(data).length) {
        this.attributes.push(
          this._formBuilder.group({
            attribute_score: [
              data.attribute_score,
              [Validators.required, Validators.min(1)]
            ],
            attribute_name: [data.attribute_name],
            attribute_id: [data.attribute_id]
          })
        );
      } else {
        this.attributes.push(
          this._formBuilder.group({
            attribute_score: [0, [Validators.required, Validators.min(1)]],
            attribute_name: [''],
            attribute_id: ['']
          })
        );
      }
    });

    return this.attributes;
  };

  populateAbilityControl(ability: AbilityContext) {
    this.abilities = this.addEditReportForm.get('abilities') as FormArray;
    this.attributes = this._formBuilder.array([]);
    this.abilities.push(
      this._formBuilder.group({
        ability_name: [ability.ability_name],
        ability_id: [ability.ability_id],
        attributes: this.prepareAttributeControl(ability.attributes)
      })
    );
  }

  setRequestDataObject(requestData: any, name: string) {
    requestData.set(
      name,
      JSON.stringify(this.addEditReportForm.get(name).value)
    );
  }

  createForm() {
    this.addEditReportForm = this._formBuilder.group({
      abilities: this._formBuilder.array([]),
      remarks: ['']
    });
  }

  ngOnDestroy() {}
}
