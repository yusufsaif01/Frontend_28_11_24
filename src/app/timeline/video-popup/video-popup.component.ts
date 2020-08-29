import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '@app/shared/static-data/static-data';
import { TimelineService } from '../timeline.service';
import { untilDestroyed } from '@app/core';
import { SharedService } from '@app/shared/shared.service';
import { requiredVideo } from '@app/shared/validators/requiredVideo';
import { videoTags } from '@app/shared/validators/videoTags';
import * as R from 'ramda';

export interface TagContext {
  ability: string;
  ability_name: string;
  attributes: {
    attribute: string;
    attribute_name: string;
    attribute_value?: boolean;
  }[];
}
// post format
// tags: {
//   ability: string;
//   attributes: string[];
// }[];
@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.scss']
})
export class VideoPopupComponent implements OnInit, OnDestroy {
  type: 'timeline' | 'learning_or_training' | 'match' = 'timeline';
  createVideoPostForm: FormGroup;
  media: File = null;
  steps = {
    skill: 'skill',
    selectVideo: 'selectVideo',
    tags: 'tags'
  };
  videoLength = {
    player: 2,
    timeline: 10,
    learning: 30,
    match: 150
  };

  selectedAbilityIdList: TagContext['ability'][] = [];
  tags: FormArray;
  attributes: FormArray;
  tagsArray: TagContext[] = [];
  selectedAbility: TagContext = {
    ability: '',
    ability_name: '',
    attributes: []
  };
  currentStep = 'tags';
  member_type = '';
  editMode: boolean = false;
  otherTags: any = [];
  otherValue: any = [];

  constructor(
    public dialogRef: MatDialogRef<VideoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _timelineService: TimelineService,
    private _sharedService: SharedService,
    private _toastrService: ToastrService
  ) {
    if (this.data.member_type) {
      this.member_type = this.data.member_type;
      this.otherTags =
        this.member_type === 'player'
          ? Constants.OTHER_TAGS.player
          : Constants.OTHER_TAGS.clubacademy;

      this.otherTags = R.curry((val, items) =>
        R.map(R.assoc('checked', val), items)
      )(false, this.otherTags);
    }
    this.createForm();
  }

  ngOnInit() {
    this.getAbilityAttributeList();
  }

  getAbilityAttributeList() {
    this._sharedService
      .getAbilityAttributeList()
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.tagsArray = response.data.records.map(record => {
            return {
              ability: record.id,
              ability_name: record.name,
              attributes: record.attributes.length
                ? record.attributes.map(attribute => {
                    return {
                      attribute: attribute.id,
                      attribute_name: attribute.name,
                      attribute_value: false
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
    this.tagsArray.forEach(ability => {
      this.populateAbilityControl(ability);
    });
    this.toggleSelection(this.tagsArray[0].ability);
    this.selectedAbility = this.tagsArray.find(
      ability =>
        ability.ability ===
        this.selectedAbilityIdList[this.selectedAbilityIdList.length - 1]
    );

    if (this.data.id) {
      this.currentStep = 'tags';
      this.type = this.data.post.type;
      this.editMode = true;
      this.patchValue();
    }
  }

  populateAbilityControl(ability: TagContext) {
    this.tags = this.createVideoPostForm.get('tags') as FormArray;
    this.attributes = this._formBuilder.array([]);
    this.tags.push(
      this._formBuilder.group({
        ability_name: [ability.ability_name],
        ability: [ability.ability],
        attributes: this.prepareAttributeControl(ability.attributes)
      })
    );
  }

  prepareAttributeControl = (
    attributes?: {
      attribute: string;
      attribute_name: string;
      attribute_value?: boolean;
    }[]
  ) => {
    attributes.forEach(data => {
      if (data !== undefined && Object.keys(data).length) {
        this.attributes.push(
          this._formBuilder.group({
            attribute_name: [data.attribute_name],
            attribute: [data.attribute],
            attribute_value: [data.attribute_value]
          })
        );
      } else {
        this.attributes.push(
          this._formBuilder.group({
            attribute_name: [data.attribute_name],
            attribute: [data.attribute],
            attribute_value: [false]
          })
        );
      }
    });

    return this.attributes;
  };

  addOthersValue(event: any, val: string) {
    if (event.checked && !this.otherValue.includes(val)) {
      this.otherValue.push(val);
    } else {
      this.otherValue.forEach((element: any, index: number) => {
        if (element == val) {
          this.otherValue.splice(index, 1);
        }
      });
    }
  }

  setStep(val: string) {
    if (this.media === null) return;
    this.currentStep = val;
  }

  abilityChecker(ability: string) {
    let formdata = this.createVideoPostForm.get('tags') as FormArray;
    for (let i = 0; i < formdata.length; i++) {
      if (
        formdata.at(i).value.ability === ability &&
        R.filter(R.propEq('attribute_value', true))(
          formdata.at(i).value.attributes
        ).length === 0
      ) {
        this.selectedAbilityIdList = R.reject(
          o => o === formdata.at(i).value.ability,
          this.selectedAbilityIdList
        );
        break;
      } else {
        this.selectedAbilityIdList.push(ability);
      }
    }
  }

  toggleSelection(ability: TagContext['ability']) {
    this.selectedAbilityIdList.push(ability);

    let formdata = this.createVideoPostForm.get('tags') as FormArray;
    for (let i = 0; i < formdata.length; i++) {
      if (
        formdata.at(i).value.ability === ability &&
        R.filter(R.propEq('attribute_value', true))(
          formdata.at(i).value.attributes
        ).length !== 0 &&
        !this.selectedAbilityIdList.includes(ability)
      ) {
        this.selectedAbilityIdList.push(ability);
        break;
      }
    }

    this.selectedAbility = this.tagsArray.find(
      ability =>
        ability.ability ===
        this.selectedAbilityIdList[this.selectedAbilityIdList.length - 1]
    );
  }

  getUploadVideoLength() {
    if (this.member_type === 'player') {
      return this.videoLength.player;
    }
  }

  uploadVideo(files: FileList) {
    if (
      this.createVideoPostForm.get('media').errors &&
      this.createVideoPostForm.get('media').errors.requiredVideo
    ) {
      this.media = null;
      return;
    }
    this.media = files[0];
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];

      if (!value && !value.length) {
        continue;
      }
      formData.append(key, value);
    }
    return formData;
  }

  changeFormData(formValues: { media: File; tags: TagContext[] }) {
    let data = {
      ...formValues,
      tags: formValues.tags.map(tag => {
        return {
          ability: tag.ability,
          attributes: tag.attributes.map(attribute => {
            if (attribute.attribute_value) return attribute.attribute;

            return null;
          })
        };
      })
    };

    data.tags = data.tags.filter(ability => {
      return !ability.attributes.every(attribute => attribute === null);
    });

    data.tags.forEach(ability => {
      ability.attributes = ability.attributes.filter(attribute => {
        return attribute !== null;
      });
    });

    return data;
  }

  videoPost() {
    let data = this.changeFormData(this.createVideoPostForm.value);
    let requestData = this.toFormData({
      ...data
    });

    this.setRequestDataObject(requestData, 'tags');
    requestData.set('others', JSON.stringify(this.otherValue));

    if (this.data.id) this.updateVideoPost(requestData);
    else {
      if (this.media) requestData.set('media', this.media);
      this.createVideoPost(requestData);
    }
  }

  createVideoPost(requestData: any) {
    this._timelineService
      .createVideoPost({ requestData, type: this.type })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('success');
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  updateVideoPost(requestData: any) {
    this._timelineService
      .updateVideoPost(this.data.id, requestData)
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {
          this.dialogRef.close('success');
        },
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  setRequestDataObject(requestData: any, name: string) {
    requestData.set(
      name,
      JSON.stringify(this.changeFormData(this.createVideoPostForm.value)[name])
    );
  }

  createForm() {
    this.createVideoPostForm = this._formBuilder.group({
      media: ['', [Validators.required, requiredVideo]],
      tags: this._formBuilder.array([], [videoTags]),
      others: this._formBuilder.array([])
    });
  }

  patchValue() {
    let formdata = this.createVideoPostForm.get('tags') as FormArray;
    let attributesArray = this.getAllAttributes();

    for (let i = 0; i < formdata.length; i++) {
      formdata.at(i).value.attributes.some((el: any) => {
        if (attributesArray.includes(el.attribute)) el.attribute_value = true;
      });

      if (
        R.filter(R.propEq('attribute_value', true))(
          formdata.at(i).value.attributes
        ).length !== 0
      )
        this.selectedAbilityIdList.push(formdata.at(i).value.ability);

      formdata.at(i).patchValue({
        attributes: formdata.at(i).value.attributes
      });
    }

    this.createVideoPostForm.patchValue({
      others: this.data.post.meta.others
    });

    this.otherTags.forEach((element: any) => {
      this.data.post.meta.others.forEach((el: any) => {
        if (element.value === el) {
          element.checked = true;
          this.otherValue.push(element.value);
        }
      });
    });
  }

  getAllAttributes() {
    let attributeArray: any = [];

    this.data.post.meta.abilities.forEach((result: any, index: number) => {
      result.attributes.some((el: any) => {
        attributeArray.push(el.attribute_id);
      });
    });

    return attributeArray;
  }

  ngOnDestroy() {}
}
