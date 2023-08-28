import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {
  transform(value: string) {
    let lastFour = value.slice(-4);
    return value.replace(value, `XXXX XXXX XXXX ${lastFour}`);
  }
}
