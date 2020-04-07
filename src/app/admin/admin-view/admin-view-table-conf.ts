import { TableConfig } from '@app/shared/table/TableConfig';

export class AdminViewTableConfig extends TableConfig {
  constructor() {
    super();
    this.allowedColumns = ['title', 'type', 'quiz_mapped'];

    this.columns = {
      title: {
        code: 'title',
        text: 'Chapter Name',
        getValue: (ele: any) => {
          return ele[this.columns.title.code];
        }
      },
      type: {
        code: 'type',
        text: 'Course Type',
        getValue: (ele: any) => {
          return ele[this.columns.type.code];
        }
      },
      quiz_mapped: {
        code: 'quiz_mapped',
        text: 'Assigned Quiz',
        getValue: (ele: any) => {
          return ele[this.columns.quiz_mapped.code];
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
