import { TableConfig } from '@app/shared/table/TableConfig';

export class ManageLocationTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['serialNo', 'country', 'no_of_state', 'no_of_city'];

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
      no_of_city: {
        code: 'no_of_city',
        text: 'No of Cities',
        getValue: (ele: any) => {
          return ele[this.columns.no_of_city.code];
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
