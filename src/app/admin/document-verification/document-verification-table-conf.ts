import { TableConfig } from '@app/shared/table/TableConfig';

export class DocumentVerificationTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'serialNumber',
      'name',
      'dob',
      'addedon',
      'aadhaarno',
      'aadhaarimg',
      'playerimg',
      'status'
    ];

    this.columns = {
      serialNumber: {
        code: 'serialNumber',
        text: 'S No.',
        getValue: (ele: any) => {
          return ele[this.columns.serialNumber.code];
        }
      },
      name: {
        code: 'name',
        text: 'Player Name',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
        }
      },
      dob: {
        code: 'dob',
        text: 'DOB',
        getValue: (ele: any) => {
          return ele[this.columns.dob.code];
        }
      },
      addedon: {
        code: 'addedon',
        text: 'Added On',
        getValue: (ele: any) => {
          return ele[this.columns.addedon.code];
        }
      },
      aadhaarno: {
        code: 'aadhaarno',
        text: 'Aadhaar No',
        getValue: (ele: any) => {
          return ele[this.columns.aadhaarno.code];
        }
      },
      aadhaarimg: {
        code: 'aadhaarimg',
        text: 'Aadhaar Image',
        getValue: (ele: any) => {
          return ele[this.columns.aadhaarimg.code];
        }
      },
      playerimg: {
        code: 'playerimg',
        text: 'Player Image',
        getValue: (ele: any) => {
          return ele[this.columns.playerimg.code];
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
