import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padzero'
})
export class PadzeroPipe implements PipeTransform {
  transform(value: number) {
    return value < 10 ? '0' + value : value;
  }
}
