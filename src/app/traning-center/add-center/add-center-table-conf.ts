import { TableConfig } from '@app/shared/table/TableConfig';
export class AddCenterTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['player_name', 'category', 'position'];

    this.columns = {
      player_name: {
        code: 'player_name',
        text: 'Player name',
        getValue: (ele: any) => {
          return ele[this.columns.player_name.code];
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
