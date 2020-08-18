import { AbstractControl } from '@angular/forms';
import { TagContext } from '@app/timeline/video-popup/video-popup.component';

export function videoTags(controlName: AbstractControl) {
  const tagsControl = controlName;
  let abilityRange = {
    max: 2,
    min: 1
  };
  let attributeRange = {
    max: 3,
    min: 1
  };

  let tags: TagContext[] = tagsControl.value;
  console.log(tags);

  let abilityCount = 0;
  let attributeCountList: number[] = [];
  tags.forEach(ability => {
    let attributeCount = 0;
    ability.attributes.forEach(attribute => {
      if (attribute) {
        attributeCount++;
        if (attributeCount > attributeRange.max) {
          return { maxAttributeLimit: true };
        }
      }
    });
    if (attributeCount < attributeRange.min) {
      return { minAttributeLimit: true };
    }
    attributeCountList.push(attributeCount);
    if (
      attributeCount >= attributeRange.min &&
      attributeCount <= attributeRange.max
    ) {
      abilityCount++;
      if (abilityCount > abilityRange.max) {
        return { maxAbilityLimit: true };
      }
    }
  });

  if (abilityCount < abilityRange.min) {
    return { minAbilityLimit: true };
  }
  return null;
}
