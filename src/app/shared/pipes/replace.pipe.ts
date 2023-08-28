import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
  transform(haystack: string, needle: string, replace: string) {
    return haystack.replace(new RegExp(needle, 'g'), replace);
  }
}
