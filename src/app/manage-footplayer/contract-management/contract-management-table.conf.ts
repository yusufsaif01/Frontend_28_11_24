import { TableConfig } from '@app/shared/table/TableConfig';
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
          return ele[this.columns.name.code];
        }
      },
      effective_date: {
        code: 'effective_date',
        text: 'Effective Date',
        getValue: (ele: any) => {
          return ele[this.columns.effective_date.code];
        }
      },
      expiry_date: {
        code: 'expiry_date',
        text: 'Expiry Date',
        getValue: (ele: any) => {
          return ele[this.columns.expiry_date.code];
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
