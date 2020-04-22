import { AbstractControl } from '@angular/forms';

export function matchingPassword(control: AbstractControl) {
  const password: string = control.get('password')
    ? control.get('password').value
    : control.get('new_password').value;
  const confirmPassword: string = control.get('confirmPassword')
    ? control.get('confirmPassword').value
    : control.get('confirm_password').value;
  if (password && confirmPassword) {
    if (password !== confirmPassword) {
      return {
        matchingPassword: true
      };
    }

    return null;
  }
  return null;
}
