import { TableConfig } from '@app/shared/table/TableConfig';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';
export class FootPlayerTableConfig extends TableConfig {
  constructor(private capitalize?: CapitalizePipe) {
    super();
    this.allowedColumns = [
      'serialNumber',
      'name',
      'category',
      'position',
      'email',
      'phone',
      'status'
    ];
    this.capitalize = new CapitalizePipe();

    this.columns = {
      serialNumber: {
        code: 'serialNumber',
        text: 'Sno.',
        getValue: (ele: any) => {
          return ele[this.columns.serialNumber.code];
        }
      },
      name: {
        code: 'name',
        text: 'Player Name',
        getValue: (ele: any) => {
          return this.capitalize.transform(ele[this.columns.name.code]);
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
        text: 'Phone Number',
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
