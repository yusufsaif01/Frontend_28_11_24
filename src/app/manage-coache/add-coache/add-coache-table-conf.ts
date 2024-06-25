import { TableConfig } from '@app/shared/table/TableConfig';
export class AddcoacheTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['player_name', 'current_role'];

    this.columns = {
      player_name: {
        code: 'player_name',
        text: 'Coach name',
        getValue: (ele: any) => {
          return ele[this.columns.player_name.code];
        }
      },
      current_role: {
        code: 'current_role',
        text: 'Role',
        getValue: (ele: any) => {
          return ele[this.columns.current_role.code];
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
