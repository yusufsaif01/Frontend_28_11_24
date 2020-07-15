import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class DateConversion {
  constructor(private _datePipe: DatePipe) {}
  convert(value: string | number | Date) {
    let format = 'yyyy-MM-dd';
    let finalDate = this._datePipe
      .transform(new Date(value), format)
      .toString();
    return finalDate;
  }
}
