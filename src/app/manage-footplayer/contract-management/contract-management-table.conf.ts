import { TableConfig } from '@app/shared/table/TableConfig';
import moment from 'moment';
export class ContractManagementTableConfig extends TableConfig {
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
        text: 'Player Name',
        getValue: (ele: any) => {
          let val: string = ele[this.columns.name.code];
          return val.length > 18 ? `${val.slice(0, 18)}...` : val;
        }
      },
      effective_date: {
        code: 'effective_date',
        text: 'Effective Date',
        getValue: (ele: any) => {
          let val: any = moment(ele.effective_date);
          val = val.isValid() ? val.format('DD-MMMM-YYYY') : 'NA';
          return `${val}`;
        }
      },
      expiry_date: {
        code: 'expiry_date',
        text: 'Expiry Date',
        getValue: (ele: any) => {
          let val: any = moment(ele.effective_date);
          val = val.isValid() ? val.format('DD-MMMM-YYYY') : 'NA';
          return `${val}`;
        }
      },
      created_by: {
        code: 'created_by',
        text: 'Created By',
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
