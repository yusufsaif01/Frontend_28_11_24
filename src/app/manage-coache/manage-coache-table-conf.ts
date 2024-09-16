import { TableConfig } from '@app/shared/table/TableConfig';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';
export class ManagecoacheTableConfig extends TableConfig {
  constructor(private capitalize?: CapitalizePipe) {
    super();
    this.allowedColumns = ['Ser_no', 'name', 'email', 'phone', 'status'];
    this.capitalize = new CapitalizePipe();

    this.columns = {
      Ser_no: {
        code: 'Ser_no',
        text: 'Ser.No',
        getValue: (ele: any) => {
          return ele[this.columns.Ser_no.code];
        }
      },
      name: {
        code: 'name',
        text: 'Coach Name',
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
