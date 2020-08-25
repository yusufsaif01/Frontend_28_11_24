import { TableConfig } from '@app/shared/table/TableConfig';
import moment from 'moment';
export class EmploymentContractListTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'name',
      'effective_date',
      'expiry_date',
      'created_by',
      'status'
    ];

    this.columns = {
      name: {
        code: 'name',
        text: 'Club / Academy',
        getValue: (ele: any) => {
          return `${ele[this.columns.name.code].charAt(0).toUpperCase() +
            ele[this.columns.name.code].slice(1)}`;
        }
      },
      effective_date: {
        code: 'effective_date',
        text: 'Effective date',
        getValue: (ele: any) => {
          let val: any = moment(ele.effective_date);
          val = val.isValid() ? val.format('MM-DD-YYYY') : 'NA';
          return `${val}`;
        }
      },
      expiry_date: {
        code: 'expiry_date',
        text: 'Expiry date',
        getValue: (ele: any) => {
          let val: any = moment(ele.expiry_date);
          val = val.isValid() ? val.format('MM-DD-YYYY') : 'NA';
          return `${val}`;
        }
      },
      created_by: {
        code: 'created_by',
        text: 'Created by',
        getValue: (ele: any) => {
          return ele[this.columns.created_by.code];
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
