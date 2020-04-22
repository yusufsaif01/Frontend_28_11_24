import { MasterTableConfig } from '@app/shared/master-table/MasterTableConfig';

export class ManageStateTableConfig extends MasterTableConfig {
  constructor() {
    super();
    this.allowedColumns = ['id', 'name'];

    this.columns = {
      id: {
        code: 'id',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.id.code];
        }
      },
      name: {
        code: 'name',
        text: 'States',
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
