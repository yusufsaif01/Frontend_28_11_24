import { TableConfig } from '@app/shared/table/TableConfig';

export class ManagePositionTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNo', 'position', 'abbrevation'];

    this.columns = {
      serialNo: {
        code: 'serialNo',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNo.code];
        }
      },
      position: {
        code: 'position',
        text: 'Position',
        getValue: (ele: any) => {
          return ele[this.columns.position.code];
        }
      },
      abbrevation: {
        code: 'abbrevation',
        text: 'Abbreviation',
        getValue: (ele: any) => {
          return ele[this.columns.abbrevation.code];
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
