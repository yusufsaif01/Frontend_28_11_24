import { TableConfig } from '@app/shared/table/TableConfig';
export class ContractListTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'serialNumber',
      'clubAcademy',
      'effectiveDate',
      'expiryDate',
      'createdBy',
      'status'
    ];

    this.columns = {
      serialNumber: {
        code: 'serialNumber',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNumber.code];
        }
      },
      clubAcademy: {
        code: 'clubAcademy',
        text: 'Club/Academy',
        getValue: (ele: any) => {
          return ele[this.columns.clubAcademy.code];
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
      createdBy: {
        code: 'createdBy',
        text: 'Created By',
        getValue: (ele: any) => {
          return ele[this.columns.createdBy.code];
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
