import { AbstractControl } from '@angular/forms';

export function requiredPdfDocument(
  controlName: AbstractControl
): { [key: string]: boolean } | null {
  const file = controlName;
  if (file.value) {
    const data = file.value.replace(/^.*[\\\/]/, '').split('.');
    const extension = data[data.length - 1];
    if ('pdf' !== extension.toLowerCase()) {
      return {
        requiredPdfDocument: true
      };
    }

    return null;
  }

  return null;
}
