import { TableConfig } from '@app/shared/table/TableConfig';
export class AddcoacheTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['player_name', 'category'];

    this.columns = {
      player_name: {
        code: 'player_name',
        text: 'Coach name',
        getValue: (ele: any) => {
          return ele[this.columns.player_name.code];
        }
      },
      category: {
        code: 'category',
        text: 'Role',
        getValue: (ele: any) => {
          return '-';
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
