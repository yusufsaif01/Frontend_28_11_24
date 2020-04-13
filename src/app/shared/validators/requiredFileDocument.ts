import { AbstractControl, FormGroup } from '@angular/forms';

export function requiredFileDocument(
  controlName: AbstractControl
): { [key: string]: boolean } | null {
  const file = controlName;
  if (file.value) {
    const data = file.value.replace(/^.*[\\\/]/, '').split('.');
    const extension = data[data.length - 1];
    if (
      'png' !== extension.toLowerCase() &&
      'pdf' !== extension.toLowerCase() &&
      'jpeg' !== extension.toLowerCase() &&
      'jpg' !== extension.toLowerCase()
    ) {
      return {
        requiredFileDocument: true
      };
    }

    return null;
  }

  return null;
}
