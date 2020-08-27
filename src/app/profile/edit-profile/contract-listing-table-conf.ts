import { TableConfig } from '@app/shared/table/TableConfig';
import { CapitalizePipe } from './../../shared/pipes/capitalize.pipe';
export class ContractListTableConfig extends TableConfig {
  constructor(private capitalize?: CapitalizePipe) {
    super();
    this.allowedColumns = [
      'serialNumber',
      'name',
      'effectiveDate',
      'expiryDate',
      'created_by',
      'status'
    ];
    this.capitalize = new CapitalizePipe();

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
        text: 'Club/Academy',
        getValue: (ele: any) => {
          return this.capitalize.transform(ele[this.columns.name.code]);
        }
      },
      effectiveDate: {
        code: 'effectiveDate',
        text: 'Effective Date',
        getValue: (ele: any) => {
          return ele[this.columns.effectiveDate.code];
        }
      },
      expiryDate: {
        code: 'expiryDate',
        text: 'Expiry Date',
        getValue: (ele: any) => {
          return ele[this.columns.expiryDate.code];
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
