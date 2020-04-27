import { TableConfig } from '@app/shared/table/TableConfig';

export class ManageParameterTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNo', 'parameters'];

    this.columns = {
      serialNo: {
        code: 'serialNo',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNo.code];
        }
      },
      parameters: {
        code: 'parameters',
        text: 'Parameter',
        getValue: (ele: any) => {
          return ele[this.columns.parameters.code];
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
