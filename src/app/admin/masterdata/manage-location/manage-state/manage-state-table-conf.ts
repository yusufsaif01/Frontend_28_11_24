import { MasterTableConfig } from '@app/shared/master-table/MasterTableConfig';

export class ManageStateTableConfig extends MasterTableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNo', 'state'];

    this.columns = {
      serialNo: {
        code: 'serialNo',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNo.code];
        }
      },
      state: {
        code: 'state',
        text: 'States',
        getValue: (ele: any) => {
          return ele[this.columns.state.code];
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
