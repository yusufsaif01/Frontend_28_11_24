import { TableConfig } from '@app/shared/table/TableConfig';

export class ManageLocationTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'serialNumber',
      'country',
      'no_of_state',
      'no_of_district'
    ];

    this.columns = {
      serialNumber: {
        code: 'serialNumber',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNumber.code];
        }
      },
      country: {
        code: 'country',
        text: 'Country',
        getValue: (ele: any) => {
          return ele[this.columns.country.code];
        }
      },
      no_of_state: {
        code: 'no_of_state',
        text: 'No of States',
        getValue: (ele: any) => {
          return ele[this.columns.no_of_state.code];
        }
      },
      no_of_district: {
        code: 'no_of_district',
        text: 'No of Districts',
        getValue: (ele: any) => {
          return ele[this.columns.no_of_district.code];
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
