import { TableConfig } from '@app/shared/table/TableConfig';
export class AddFootPlayerTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'serialNumber',
      'avatar',
      'playerName',
      'category',
      'position'
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
      playerName: {
        code: 'playerName',
        text: 'Name',
        getValue: (ele: any) => {
          return ele[this.columns.playerName.code];
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
