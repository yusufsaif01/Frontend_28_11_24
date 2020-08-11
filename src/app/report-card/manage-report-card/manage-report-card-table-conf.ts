import { TableConfig } from '@app/shared/table/TableConfig';
export class ManageReportCardTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = [
      'name',
      'category',
      'published_date',
      'createby',
      'number_report_card',
      'status'
    ];

    this.columns = {
      name: {
        code: 'name',
        text: 'Name',
        getValue: (ele: any) => {
          return ele[this.columns.name.code];
        }
      },
      category: {
        code: 'category',
        text: 'Category',
        getValue: (ele: any) => {
          return ele[this.columns.category.code];
        }
      },
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

      number_report_card: {
        code: 'number_report_card',
        text: 'No. of report card',
        getValue: (ele: any) => {
          return ele[this.columns.number_report_card.code];
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
