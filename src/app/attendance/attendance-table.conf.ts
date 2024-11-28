import { TableConfig } from '@app/shared/table/TableConfig';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';
export class AttendanceTableConfig extends TableConfig {
  constructor(private capitalize?: CapitalizePipe) {
    super();
    this.allowedColumns = [
      'traning_center_name',
      'start_time',
      'end_time',
      'coache_name',
      'opening_days',
      'full_address'
    ];
    this.capitalize = new CapitalizePipe();

    this.columns = {
      traning_center_name: {
        code: 'traning_center_name',
        text: 'Center name',
        getValue: (ele: any) => {
          return this.capitalize.transform(
            ele[this.columns.traning_center_name.code]
          );
        }
      },
      start_time: {
        code: 'start_time',
        text: 'Start Time',
        getValue: (ele: any) => {
          return ele[this.columns.start_time.code];
        }
      },
      end_time: {
        code: 'end_time',
        text: 'End Time',
        getValue: (ele: any) => {
          return ele[this.columns.end_time.code];
        }
      },
      coache_name: {
        code: 'coache_name',
        text: 'coache Name',
        getValue: (ele: any) => {
          return ele[this.columns.coache_name.code];
        }
      },
      opening_days: {
        code: 'opening_days',
        text: 'Opening Days',
        getValue: (ele: any) => {
          return ele[this.columns.opening_days.code]
            .map(item => item.item_text + '\n')
            .toString();
        }
      },
      full_address: {
        code: 'full_address',
        text: 'Address',
        getValue: (ele: any) => {
          return ele[this.columns.full_address.code];
        }
      },
      action: {
        code: 'action',
        text: 'Mark Attendance',
        getValue: (ele: any) => {
          return ele[this.columns.action.code];
        }
      }
    };
  }
}
