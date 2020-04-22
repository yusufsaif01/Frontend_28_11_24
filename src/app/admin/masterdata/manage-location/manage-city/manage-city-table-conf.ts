import { MasterTableConfig } from '@app/shared/master-table/MasterTableConfig';

export class ManageCityTableConfig extends MasterTableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNo', 'cities'];

    this.columns = {
      serialNo: {
        code: 'serialNo',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNo.code];
        }
      },
      cities: {
        code: 'cities',
        text: 'Cities',
        getValue: (ele: any) => {
          return ele[this.columns.cities.code];
        }
      },
      action: {
        code: 'action',
        text: 'Action',
        getValue: (ele: any) => {
          return ele[this.columns.action.code];
        }
      }
    };
  }
}
