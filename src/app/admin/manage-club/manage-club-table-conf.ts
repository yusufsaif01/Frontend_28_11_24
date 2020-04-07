import { TableConfig } from '@app/shared/table/TableConfig';

export class ManageClubTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['name', 'no_of_players', 'email', 'status'];

    this.columns = {
      name: {
        code: 'name',
        text: 'Club Name',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
        }
      },
      no_of_players: {
        code: 'no_of_players',
        text: 'No. of Players',
        getValue: (ele: any) => {
          return ele[this.columns.no_of_players.code];
        }
      },
      email: {
        code: 'email',
        text: 'E-Mail ID',
        getValue: (ele: any) => {
          return ele[this.columns.email.code];
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
