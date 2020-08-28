import { TableConfig } from '@app/shared/table/TableConfig';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';

export class ManagePlayerTableConfig extends TableConfig {
  constructor(private capitalize?: CapitalizePipe) {
    super();
    this.allowedColumns = ['name', 'position', 'type', 'email', 'status'];
    this.capitalize = new CapitalizePipe();
    this.columns = {
      name: {
        code: 'name',
        text: 'Player Name',
        getValue: (ele: any) => {
          return this.capitalize.transform(ele[this.columns.name.code]);
        }
      },
      position: {
        code: 'position',
        text: 'Position',
        getValue: (ele: any) => {
          return ele[this.columns.position.code];
        }
      },
      type: {
        code: 'type',
        text: 'Player Type',
        getValue: (ele: any) => {
          return ele[this.columns.type.code];
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
