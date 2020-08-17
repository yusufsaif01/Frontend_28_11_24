import { NativeDateAdapter } from '@angular/material';
import moment from 'moment';

export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return moment(date).format('MM-DD-YYYY');
    }

    return moment(date).format('YYYY');
  }
}
