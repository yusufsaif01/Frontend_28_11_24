import { TableConfig } from '@app/shared/table/TableConfig';
export class LinkReportCardTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['published_date', 'createby', 'status'];

    this.columns = {
      published_date: {
        code: 'published_date',
        text: 'Published date ',
        getValue: (ele: any) => {
          return ele[this.columns.published_date.code];
        }
      },
      createby: {
        code: 'createby',
        text: 'Create By',
        getValue: (ele: any) => {
          return ele[this.columns.createby.code];
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
