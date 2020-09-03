import { NativeDateAdapter } from '@angular/material';
import { Injectable } from '@angular/core';
import moment from 'moment';
@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return moment(date).format('MM-DD-YYYY');
    }

    return moment(date).format('YYYY');
  }
}
