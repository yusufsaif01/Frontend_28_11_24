import { AbstractControl } from '@angular/forms';
import { Constants } from '@app/shared/static-data/static-data';

export function requiredVideo(
  controlName: AbstractControl
): { [key: string]: boolean } | null {
  const file = controlName;
  if (file.value) {
    const data = file.value.replace(/^.*[\\\/]/, '').split('.');
    const extension = data[data.length - 1];
    if (!Constants.TIMELINE_VIDEO_EXTENSION.includes(extension.toLowerCase())) {
      return {
        requiredVideo: true
      };
    }

    return null;
  }

  return null;
}
