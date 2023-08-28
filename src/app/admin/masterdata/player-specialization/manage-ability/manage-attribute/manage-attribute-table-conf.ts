import { TableConfig } from '@app/shared/table/TableConfig';

export class ManageAttributeTableConfig extends TableConfig {
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
        text: 'Attribute',
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
