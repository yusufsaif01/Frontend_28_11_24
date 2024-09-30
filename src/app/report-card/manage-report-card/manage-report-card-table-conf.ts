import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';
import { TableConfig } from '@app/shared/table/TableConfig';
import moment from 'moment';
export class ManageReportCardTableConfig extends TableConfig {
  constructor(member_type: string, private capitalize?: CapitalizePipe) {
    super();
    this.capitalize = new CapitalizePipe();
    if (member_type === 'player') {
      this.allowedColumns = ['Ser_no', 'created_by', 'name', 'published_at'];
    } else if (member_type !== 'player') {
      this.allowedColumns = [
        'Ser_no',
        'name',
        'category',
        'published_at',
        'no_of_report_cards',
        'status'
      ];
    }

    this.columns = {
      Ser_no: {
        code: 'Ser_no',
        text: 'Sno.',
        getValue: (ele: any) => {
          return ele[this.columns.Ser_no.code];
        }
      },
      name: {
        code: 'name',
        text: member_type === 'player' ? 'Name' : 'Player name',
        getValue: (ele: any) => {
          return this.capitalize.transform(ele[this.columns.name.code]);
        }
      },
      created_by: {
        code: 'created_by',
        text: 'Created by',
        getValue: (ele: any) => {
          return ele[this.columns.created_by.code];
        }
      },
      category: {
        code: 'category',
        text: 'Category',
        getValue: (ele: any) => {
          return ele[this.columns.category.code];
        }
      },
      published_at: {
        code: 'published_at',
        text: 'Published date ',
        getValue: (ele: any) => {
          let val: any = moment(ele.published_at);
          val = val.isValid() ? val.format('MM-DD-YYYY') : '';
          return `${val}`;
        }
      },
      no_of_report_cards: {
        code: 'no_of_report_cards',
        text: 'No. of report card',
        getValue: (ele: any) => {
          return ele[this.columns.no_of_report_cards.code];
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
