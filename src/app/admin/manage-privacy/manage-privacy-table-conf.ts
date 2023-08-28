import { TableConfig } from '@app/shared/table/TableConfig';

export class ManagePrivacyTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNumber', 'name', 'phone', 'email'];

    this.columns = {
      serialNumber: {
        code: 'serialNumber',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNumber.code];
        }
      },
      name: {
        code: 'name',
        text: 'Name',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
        }
      },
      phone: {
        code: 'phone',
        text: 'Phone No.',
        getValue: (ele: any) => {
          return ele[this.columns.phone.code];
        }
      },
      email: {
        code: 'email',
        text: 'Email',
        getValue: (ele: any) => {
          return ele[this.columns.email.code];
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
