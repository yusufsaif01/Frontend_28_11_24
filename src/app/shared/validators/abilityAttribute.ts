import { AbstractControl } from '@angular/forms';
import { AbilityContext } from '@app/report-card/add-edit-report-card/add-edit-report-card.component';

export function abilityAttribute(controlName: AbstractControl) {
  const abilitiesControl = controlName;
  let abilities: AbilityContext[] = abilitiesControl.value;
  let count = 0;
  let attributeLimitCountList: number[] = [];
  abilities.forEach(ability => {
    let attributeLimitCount = 0;
    ability.attributes.forEach(attribute => {
      if (attribute.attribute_score > 0) {
        attributeLimitCount++;
      }
    });
    attributeLimitCountList.push(attributeLimitCount);
    if (attributeLimitCount >= 3) {
      count++;
    }
  });

  if (count < 3) {
    return { requiredAttribute: true };
  }
  // if (attributeLimitCountList.some(count => count < 3 && count !== 0)) {
  //   return { provideRequiredAttributes: true };
  // }
  return null;
}
