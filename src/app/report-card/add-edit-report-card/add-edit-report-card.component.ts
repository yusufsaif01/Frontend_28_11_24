import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {
  AddEditReportCardService,
  GetReportCardResponseContext
} from './add-edit-report-card.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEditEmploymentContractService } from '@app/profile/add-edit-employment-contract/add-edit-employment-contract.service';
import { untilDestroyed } from '@app/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { abilityAttribute } from '@app/shared/validators/abilityAttribute';
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
  report_card_id = '';
  playerDetails: any = {};
  abilitiesArray: AbilityContext[] = [];
  selectedAbility: AbilityContext = {
    ability_id: '',
    ability_name: '',
    attributes: []
  };
  reportCardData: GetReportCardResponseContext['data'];
  editMode = false;
  viewMode = false;

  constructor(
    private _addEditReportCardService: AddEditReportCardService,
    private _employmentContractService: AddEditEmploymentContractService,
    private _formBuilder: FormBuilder,
    private _sharedService: SharedService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getAbilityAttributeList();
    this._activatedRoute.params.subscribe(param => {
      if (param.send_to) {
        this.send_to = param.send_to;
        this.getPlayerDetails(this.send_to);
      }
      if (param.report_card_id) {
        this.editMode = true;
        this.report_card_id = param.report_card_id;
        this.populateView();
      }
    });
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

  editReportCard(status: 'published' | 'draft') {
    let data = this.changeFormData(this.addEditReportForm.value);
    let requestData = this.toFormData({
      status,
      ...data
    });
    this.setRequestDataObject(requestData, 'abilities');

    this._addEditReportCardService
      .editReportCard({ requestData, report_card_id: this.report_card_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          if (status === 'published') {
            this._toastrService.success(
              'Success',
              'Report card published successfully'
            );
          } else if (status === 'draft') {
            this._toastrService.success(
              'Success',
              'Report card saved as draft'
            );
          }
          this._router.navigate(['/member/manage-report-card']);
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  populateView() {
    this._addEditReportCardService
      .getReportCard({ report_card_id: this.report_card_id })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.reportCardData = response.data;
          this.populateFormFields();
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  addEditReportCard(status: 'published' | 'draft') {
    this.editMode ? this.editReportCard(status) : this.createReportCard(status);
  }

  populateFormFields() {
    this.addEditReportForm.patchValue(this.reportCardData);
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

  prepareAttributeControl = (
    attributes?: {
      attribute_id: string;
      attribute_name: string;
      attribute_score?: number | string;
    }[]
  ) => {
    attributes.forEach(data => {
      if (data !== undefined && Object.keys(data).length) {
        this.attributes.push(
          this._formBuilder.group({
            attribute_score: [data.attribute_score],
            attribute_name: [data.attribute_name],
            attribute_id: [data.attribute_id]
          })
        );
      } else {
        this.attributes.push(
          this._formBuilder.group({
            attribute_score: [''],
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

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];

      if (!value && !value.length && key != 'bio') {
        continue;
      }
      formData.append(key, value);
    }
    return formData;
  }

  setRequestDataObject(requestData: any, name: string) {
    requestData.set(
      name,
      JSON.stringify(this.changeFormData(this.addEditReportForm.value)[name])
    );
  }

  changeFormData(formValues: { remarks: string; abilities: AbilityContext[] }) {
    let data = {
      ...formValues,
      abilities: formValues.abilities.map(ability => {
        return {
          ability_id: ability.ability_id,
          attributes: ability.attributes.map(attribute => {
            if (attribute.attribute_score) {
              return {
                attribute_id: attribute.attribute_id,
                attribute_score: attribute.attribute_score
              };
            }
            return null;
          })
        };
      })
    };

    data.abilities
      .filter(ability => {
        return !ability.attributes.every(attribute => attribute === null);
      })
      .forEach(ability => {
        ability.attributes = ability.attributes.filter(attribute => {
          return attribute !== null;
        });
      });

    return data;
  }

  createReportCard(status: 'published' | 'draft') {
    console.log(this.addEditReportForm.value);
    let data = this.changeFormData(this.addEditReportForm.value);
    let requestData = this.toFormData({
      send_to: this.send_to,
      status,
      ...data
    });
    this.setRequestDataObject(requestData, 'abilities');
    this._addEditReportCardService
      .createReportCard(requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          if (status === 'published') {
            this._toastrService.success(
              'Success',
              'Report card published successfully'
            );
          } else if (status === 'draft') {
            this._toastrService.success(
              'Success',
              'Report card saved as draft'
            );
          }
          this._router.navigate(['/member/manage-report-card']);
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  createForm() {
    this.addEditReportForm = this._formBuilder.group({
      abilities: this._formBuilder.array([], [abilityAttribute]),
      remarks: ['']
    });
  }

  resetForm() {
    this.addEditReportForm.get('remarks').setValue('');
    this.abilities.clear();
    this.initializeAbilities();
  }

  initializeAbilities() {
    this.abilitiesArray.forEach(ability => {
      this.populateAbilityControl(ability);
    });
    this.selectedAbility = this.abilitiesArray[0];
  }

  ngOnDestroy() {}
}
