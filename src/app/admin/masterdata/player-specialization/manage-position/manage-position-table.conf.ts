import { TableConfig } from '@app/shared/table/TableConfig';

export class ManagePositionTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNo', 'name', 'abbreviation'];

    this.columns = {
      serialNo: {
        code: 'serialNo',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNo.code];
        }
      },
      name: {
        code: 'name',
        text: 'Position',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
        }
      },
      abbreviation: {
        code: 'abbreviation',
        text: 'Abbreviation',
        getValue: (ele: any) => {
          return ele[this.columns.abbreviation.code];
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
