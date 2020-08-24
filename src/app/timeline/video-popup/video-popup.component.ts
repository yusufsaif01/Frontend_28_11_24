import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TimelineService } from '../timeline.service';
import { untilDestroyed } from '@app/core';
import { SharedService } from '@app/shared/shared.service';
import { requiredVideo } from '@app/shared/validators/requiredVideo';
import { videoTags } from '@app/shared/validators/videoTags';

export interface TagContext {
  ability: string;
  ability_name: string;
  attributes: {
    attribute: string;
    attribute_name: string;
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
  type: 'timeline' | 'learning_or_training_video' | 'match_videos' = 'timeline';
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
  currentStep = 'selectVideo';
  member_type = '';

  constructor(
    public dialogRef: MatDialogRef<VideoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _timelineService: TimelineService,
    private _sharedService: SharedService,
    private _toastrService: ToastrService
  ) {
    if (data.member_type) {
      this.member_type = data.member_type;
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
                      attribute_name: attribute.name
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
    }[]
  ) => {
    attributes.forEach(data => {
      if (data !== undefined && Object.keys(data).length) {
        this.attributes.push(
          this._formBuilder.group({
            attribute_name: [data.attribute_name],
            attribute: ['']
          })
        );
      } else {
        this.attributes.push(
          this._formBuilder.group({
            attribute_name: [''],
            attribute: ['']
          })
        );
      }
    });

    return this.attributes;
  };

  setStep(val: string) {
    if (this.media === null) return;
    this.currentStep = val;
  }

  toggleSelection(ability: TagContext['ability']) {
    if (this.selectedAbilityIdList.includes(ability)) {
      this.selectedAbilityIdList = this.selectedAbilityIdList.filter(val => {
        return val !== ability;
      });
    } else {
      this.selectedAbilityIdList.push(ability);
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

  createVideoPost() {
    let requestData = this.toFormData(this.createVideoPostForm.value);
    let abc = [
      {
        ability: '4dfbd731-f523-49fa-94d8-7eb8238de403',
        attributes: ['bd32daac-8e53-4b1a-a88e-24999477a58e']
      },
      {
        ability: '2e9bb4e4-4778-42c9-881c-d300798fbfb6',
        attributes: ['b1ed6794-e5a6-441c-a918-c1e236ec6319']
      }
    ];

    if (this.media) requestData.set('media', this.media);
    requestData.set('tags', JSON.stringify(abc));

    this._timelineService
      .createVideoPost({ requestData, type: this.type })
      .pipe(untilDestroyed(this))
      .subscribe(
        response => {},
        error => {
          this._toastrService.error('Error', error.error.message);
        }
      );
  }

  setRequestDataObject(requestData: any, name: string) {
    requestData.set(name, JSON.stringify(this.createVideoPostForm.value[name]));
  }

  createForm() {
    this.createVideoPostForm = this._formBuilder.group({
      media: ['', [Validators.required, requiredVideo]],
      tags: this._formBuilder.array([], [videoTags])
    });
  }

  ngOnDestroy() {}
}
