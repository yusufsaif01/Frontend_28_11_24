import { MasterTableConfig } from '@app/shared/master-table/MasterTableConfig';

export class ManageDistrictTableConfig extends MasterTableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNumber', 'name'];

    this.columns = {
      serialNumber: {
        code: 'serialNumber',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNumber.code];
        }
      },
      name: {
        code: 'name',
        text: 'Districts',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
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
