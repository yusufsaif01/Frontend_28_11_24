import { TableConfig } from '@app/shared/table/TableConfig';
export class FootPlayerTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'name',
      'category',
      'position',
      'email',
      'phone',
      'status'
    ];

    this.columns = {
      name: {
        code: 'name',
        text: 'Player name',
        getValue: (ele: any) => {
          return `${ele[this.columns.name.code].charAt(0).toUpperCase() +
            ele[this.columns.name.code].slice(1)}`;
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
