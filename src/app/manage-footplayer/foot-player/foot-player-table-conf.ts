import { TableConfig } from '@app/shared/table/TableConfig';
export class FootPlayerTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'serialNumber',
      'avatar',
      'name',
      'category',
      'position',
      'status'
    ];

    this.columns = {
      serialNumber: {
        code: 'serialNumber',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNumber.code];
        }
      },
      avatar: {
        code: 'avatar',
        text: 'DP',
        getValue: (ele: any) => {
          return ele[this.columns.avatar.code];
        }
      },
      name: {
        code: 'name',
        text: 'Name',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
        }
      },
      category: {
        code: 'category',
        text: 'Category',
        getValue: (ele: any) => {
          return ele[this.columns.category.code];
        }
      },
      position: {
        code: 'position',
        text: 'Position',
        getValue: (ele: any) => {
          return ele[this.columns.position.code];
        }
      },
      status: {
        code: 'status',
        text: 'Status',
        getValue: (ele: any) => {
          return ele[this.columns.status.code];
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
