import { TableConfig } from '@app/shared/table/TableConfig';

export class ManageLocationTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'serialNo',
      'country',
      'no_of_state',
      'no_of_cities'
    ];

    this.columns = {
      serialNo: {
        code: 'serialNo',
        text: 'S.No',
        getValue: (ele: any) => {
          return ele[this.columns.serialNo.code];
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
      no_of_cities: {
        code: 'no_of_cities',
        text: 'No of Cities',
        getValue: (ele: any) => {
          return ele[this.columns.no_of_cities.code];
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
