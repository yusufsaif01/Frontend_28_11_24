import { AbstractControl } from '@angular/forms';

export function requiredFileAvatar(
  controlName: AbstractControl
): { [key: string]: boolean } | null {
  const file = controlName;
  if (file.value) {
    const data = file.value.replace(/^.*[\\\/]/, '').split('.');
    const extension = data[data.length - 1];
    if (
      'png' !== extension.toLowerCase() &&
      'jpeg' !== extension.toLowerCase() &&
      'jpg' !== extension.toLowerCase()
    ) {
      return {
        requiredFileAvatar: true
      };
    }

    return null;
  }

  return null;
}
