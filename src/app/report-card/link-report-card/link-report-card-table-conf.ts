import { TableConfig } from '@app/shared/table/TableConfig';
import moment from 'moment';

export class LinkReportCardTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['published_at', 'created_by', 'status'];

    this.columns = {
      published_at: {
        code: 'published_at',
        text: 'Published date ',
        getValue: (ele: any) => {
          let val: any = moment(ele.published_at);
          val = val.isValid() ? val.format('MM-DD-YYYY') : '';
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
