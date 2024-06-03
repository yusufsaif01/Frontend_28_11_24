import { TableConfig } from '@app/shared/table/TableConfig';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';
export class ManagecoacheTableConfig extends TableConfig {
  constructor(private capitalize?: CapitalizePipe) {
    super();
    this.allowedColumns = ['name', 'email', 'phone', 'status'];
    this.capitalize = new CapitalizePipe();

    this.columns = {
      name: {
        code: 'name',
        text: 'coach name',
        getValue: (ele: any) => {
          return this.capitalize.transform(ele[this.columns.name.code]);
        }
      },

      email: {
        code: 'email',
        text: 'Email',
        getValue: (ele: any) => {
          return ele[this.columns.email.code];
        }
      },
      phone: {
        code: 'phone',
        text: 'Phone number',
        getValue: (ele: any) => {
          return ele[this.columns.phone.code];
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
