import { AbstractControl } from '@angular/forms';

export function wordCount(
  controlName: AbstractControl
): { [key: string]: boolean } | null {
  const data = controlName;
  if (data.value) {
    let str = data.value;
    str = str.replace(/(^\s*)|(\s*$)/gi, '');
    str = str.replace(/[ ]{2,}/gi, ' ');
    str = str.replace(/\n /, '\n');
    if (str.split(' ').length > 60) {
      return {
        wordCount: true
      };
    }

    return null;
  }

  return null;
}
